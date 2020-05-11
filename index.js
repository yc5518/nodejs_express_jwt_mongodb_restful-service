const express = require('express');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./router/api-routes');

const app = express();

// Allow all cors
app.use(cors());

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
mongoose.connect('mongodb://yc5518:GkRTjFhU6jhsrARZdthyl0UksLSo5WErretg5sehEIBzfbdmkluCJklBScutluZWckQrGCJGsp87oAEsupCoPQ==@yc5518.mongo.cosmos.azure.com:10255/resthub?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@yc5518@', { useNewUrlParser: true });
// mongodb://yc5518:GkRTjFhU6jhsrARZdthyl0UksLSo5WErretg5sehEIBzfbdmkluCJklBScutluZWckQrGCJGsp87oAEsupCoPQ==@yc5518.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@yc5518@
const db = mongoose.connection;

// Added check for DB connection
if (!db) console.log('Error connecting db');
else console.log('Db connected successfully');

// Setup server port
const port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api/v1', apiRoutes);

// Launch app with http to listen to specified port
app.listen(port, () => {
  console.log(`Running RestHub on port ${port}`);
});

// Launch app with httpS to listen to specified port
// https.createServer({
//   key: fs.readFileSync('./key.pem'),
//   cert: fs.readFileSync('./cert.pem'),
//   passphrase: 'yc5518',
// }, app).listen(port);
