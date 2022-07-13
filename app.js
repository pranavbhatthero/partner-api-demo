var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
// var fetch = require('node-fetch');

var app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static('public'));
app.use(bodyParser.json());

///*
// ———————— ADDED MOCKING SERVICE ————————
app.get('/mock', function (req, res) {
    console.log('Hello IFN !');
    //console.log('here', Object.keys(req.body));
    // res.status(200).send(req.body);
    res.status(200).send("Hello IFN !");

});
// ———————— ADDED MOCKING SERVICE ————————  
//*/

// ———————— ADDED GET SERVICE ————————
app.get("/serviceability", (req, res) => {
    console.log("Serviceability");
    //res.send("Hello World");
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM salesforce.Serviceability__c', function(err, result) {
          done();
          if(err) return console.error(err);
          console.log(result.rows);
          res.status(200).send(JSON.stringify(result));
        });
    });
      
});


app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});




