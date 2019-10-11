import express from 'express';
//ongoose.Promise = global.Promise;
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.listen(5000, () => console.log(`Example app listening on port ${5005}!`));


module.exports = app;
