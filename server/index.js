const db = require('./db');
const path = require('path');
const express = require('express');
const compression = require('compression');
const volleyball = require('volleyball');
const morgan = require('morgan'); //required on line 39
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({ db });
const passport = require('passport')
const PORT = process.env.PORT || 8080;
const app = express();
// BUILD FRONT END IN SAME FILE
// BUILD FRONT END IN SAME FILE
// BUILD FRONT END IN SAME FILE
// BUILD FRONT END IN SAME FILE
// BUILD FRONT END IN SAME FILE
// BUILD FRONT END IN SAME FILE
// BUILD FRONT END IN SAME FILE
// BUILD FRONT END IN SAME FILE
// BUILD FRONT END IN SAME FILE
// BUILD FRONT END IN SAME FILE

module.exports = app;

// global Mocha hook to close after testing
if (process.env.NODE_ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions);
}

if (process.env.NODE_ENV !== 'production') require('../secrets.js');

//passport serialization
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findOne({
      where: {
        id: id
      }
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// creating the server

const createApp = () => {
  //logging middleware
  // app.use(require(morgan('dev')));
  // app.use(require);

  //body parsing middleware

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // compression middleware

  app.use(compression());

  // session middleware with passport and express
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'default',
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // auth and api routes
  app.use('/auth', require('./auth'));
  app.use('/api', require('./api'));

  // static file-serving middlware

  app.use(express.static(path.join(__dirname, '..', 'public')));

  // 404

  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // sends index.html
  // app.use('*', (req, res) => {
  //   res.sendFile(__dirname, '..', 'public/index.html');
  // });

  // error handling endware? 500
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
  });
};

const startListening = () => {
  const server = app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}`);
  });
};

const syncdb = () => db.sync();

async function bootApp() {
  try {
    await sessionStore.sync();
    await syncdb();
    await createApp();
    await startListening();
  } catch (err) {
    console.log(err);
  }
}

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec

// if (require.main === module) {
//   bootApp();
// } else {
//   createApp();
// }
bootApp();
