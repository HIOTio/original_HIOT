const express = require('express');
const mqtt = require('./MQTT');
const router = express.Router();
let response = {
    status: 200,
    data: [],
    message: null
};

router.get('/users', (req, res) => {

         response.data= [
            {
            "name":"Mark"
        }
        ]
         res.json(response)
    })
router.post('/mqtt_send',function(req,res){
   // console.log(req.body);
    mqtt.publish(req.body.topic,JSON.stringify({
        "c":req.body.c,
        "p": req.body.p
    }))
    res.send(200);
});
module.exports = router