var nodeq = require("node-q");
nodeq.connect({host: "127.0.0.1", port: 5000}, function(err, con) {
    if (err) throw err;
    console.log("connected");
    con.k("select sum amount by city from tab", function(err, res) {
    if (err) throw err;
    console.log("result", res); // 6 
}); 
});

