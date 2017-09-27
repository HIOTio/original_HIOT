/*

    Act as intermediary for health and config channels
    Send execution commands to controllers

    2 Network interfaces & 2 mosca deployments, one on local subnet ("downstream") and one to route "upstream"
    
    Publications & subscriptions
    -- x/<x>/<y>/<z>/.../deviceId = execute command on controller
    -- h/<x>/<y>/<z>/.../deviceId = forward health messages from devices 
    -- x/<x>/<y>/<z>/ (.../controllerId) = subscribe to execution commands on a particular path
    -- C/<x>/<y>/<z>/ (.../deviceId) =  forward config requests from platform to device
    -- c/<x>/<y>/<z>/.../deviceId = send config to platform
    -- e/<x>/<y>/<z>/.../deviceId = send error messages to platform
    -- B... = Broker to Broker comms - for future use...

    -- each publication has a "needResponse" flag - used to track responses required, send "e" message if no response received

    timer structure
    {
        ch:X, -- this is the response channel
        items:[
            {
                "createdAt":dateTime,
                "channel": X/1/2/3,
                setInterval: setIntervalInstance  -- this is what we want to cleanInterval
            }
        ]
        
    }
    setInterval requirements
    -- track number of iterations
    -- purge timer and clearInterval after retry limit (default 5)
    -- send warning to platform (add "w/" to start of path)
*/

var mqtt= require('mqtt')

var channels=[
    {
        ch:"X",
        desc:"Execute Command on Device",
        resp:true,
        resp:"x",
        retries:10,
        timeout:1000
    },{
        ch:"x",
        desc:"execution result (from controller",
        resp:false
    },
    {
        ch:"C",
        desc:"set device config (from Platform)",
        resp:true,
        respCh:"c"
    },
    {
        ch:"c",
        desc:"Send device config (to Platform)",
        resp:false
    },
    {
        ch:"h",
        desc:"Send Device health to Platform",
        resp:false
    },
    {
        ch:"H",
        desc:"Request Device health (from Platform)",
        resp:true,
        respCh:"h"
    },
    {
        ch:"w",
        desc:"warning for platform, e.g. response message is late",
        resp:false
    }
]
var myPaths = []
var responsesNeeded=[]
var publications =[]
var subscriptions=[]
var handlers=[]
var mqttClient={}
var timers = [] // need this to track the polling and remove them 
module.exports={
    init:init,
    reset: reset
}
function init(brokers,mqttServer){
    //connect to the mqtt broker
    mqttClient= mqtt.connect ({
        server:mqttServer[0].server, 
        port:mqttServer[0].port})
    for(var i=0;i<channels.length;i++){
        //set up all channels for each ACTIVE broker
        for(var j=0;j<brokers.length;j++){
            //and for each path in the broker, ignoring inactive ones
            if(brokers[j].active){
                for (var k=0;k<brokers[j].myPaths.length;k++){
                    subscriptions.push(channels[i].ch + "/" + brokers[j].myPaths[k].in)
                    myPaths[brokers[j].myPaths[k].in]= brokers[j].myPaths[k].out
                }
            }
        }
    }
    // Subscribe to each topic
    addSubscriptions(subscriptions)
    mqttClient.on('message', function (topic, _message) {
        try {
          var message = JSON.parse(_message.toString())

          //get the associated channel from the first character
          var ch=topic[0]
          var channel =getChannel(ch)
          // make sure we get a valid channel, just in case
          if(channel){
                        //forward on the response
          var out=getOutPath(topic)
          console.log(out)
          if(out){
            mqttClient.publish(_message.toString(),ch + "/" + out)

          }
            //drop the first character and slash from the topic to match requests and responses
            var _topic=topic.toString().slice(2)  
            // is this a response to a previous message
            if(timers[ch]){
                if(timers[ch][_topic]){
                    //clear the entry from the list of timers
                    clearInterval(timers[ch][_topic].setInterval)
                    delete timers[ch][_topic]
                }
            }
            
            console.log(timers)
            //does this channel require a response  
            if(channel.resp){
                console.log(topic + " needs a response")
                //set up a timer for this response, issue a warning back to the platform if not received in time
                if(!timers[channel.respCh]){
                    timers[channel.respCh]=[]
                }
                var interval=3000 //timeout after 3 seconds by default
                var retries=4 // 4 attempts by default
                if(channel.interval){
                    interval=channel.interval
                }
                if(channel.retries){
                    retries=channel.retries
                }
                
                timers[channel.respCh][_topic]= {
                            setInterval: setInterval(
                                function(topic,channel,retries) {
                                    var _this = this
                                    var retry=0;
                                    return function(){
                                        retry++
                                        if(retry>retries){
                                            //remove the timer
                                            clearInterval(_this)
                                            return
                                        }
                                        console.log("Topic " + topic +": attempt " + retry + " of " + retries)
                                        // this is where the updates
                                    }
                                }(topic,channel,retries),
                          
                               interval)
                        }
                    }
                }
        } catch (err) {
         console.log(err)
        }
      })
}

function getChannel(char){
    for(var i=0;i<channels.length;i++){
        if(channels[i].ch==char){
            return channels[i]
        }
    }
    return null
}
function getOutPath(topic){
    console.log(myPaths.length)
    for (var i=0;i<myPaths.length;i++){
        var _topic = topic.toString()
        var _inTopic = myPaths[i].in.toString()
        //check if the topic contains myPath.in
        console.log(_inTopic)
        if(_inTopic.endsWith("#")|| _inTopic.endsWith("+")){
            //drop wildcard and last slash from mypath.in
            console.log(_intopic.slice(0,len(intopic)-2))
            if(_topic.startsWith(_intopic.slice(0,len(intopic)-2))){
                return myPaths[i].out
            }
        }
        
    }
    return null
}
function reset(aggList,mqttServer){
    //clear the mqtt subscriptions (if any)

    //disconnect from the mqtt broker

    //clear all timers

    //set up aggregators
    init(aggList,mqttServer)
}

function addSubscriptions(subs){
    for(var i=0;i<subs.length;i++){
        mqttClient.subscribe(subs[i])
        console.log ("subscribed to topic " + subs[i])
    }
   
}