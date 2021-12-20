const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const nedb = require('nedb');
const db = new nedb({filename:'locations.db', autoload: true});


app.use(express.json({ limit: '1mb' }));

//Statisches Verzeichnis setzen
app.use(express.static('public'));

app.use('/', (req, res, next) => {
    console.log(`Zugriff am: ${new Date().toLocaleString()}     von Client: ${req.ip}`);
    next();
});

app.post('/api', (req, res) => {
    db.insert(req.body);
    res.send({status: "Server meldet Post-Anfrage bearbeitet"});
  });
  

https.createServer({
    key: fs.readFileSync('steff.key'),
    cert: fs.readFileSync('steff.cert')
  }, app)
  .listen(3000, () => console.log('HTTPS Server listening on port 3000'));