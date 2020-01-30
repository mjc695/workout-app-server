const db = require('./db');
const express = require('express');
const volleyball = require('volleyball');
// const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize'(session.Store))
const PORT = process.env.PORT || 8080;
const app = express();

module.exports = app;

app.use(volleyball);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./api'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  console.log('working');
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
};

startListening();

db.sync();
