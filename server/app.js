const express = require('express')
const session = require('express-session')
const Parcel = require('parcel-bundler')
const path = require('path')

const app = express()

// hook up the cookie jar
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  name: 'sid',
  secret: 'shimlar 4ever!',
  resave: false,
  saveUninitialized: true,
  //TODO store: production-store
}))

// hook up the database
app.use( require('./lib/database'))

// hook up the backend api routes
app.use( require('./routes') )

// hook up the react client side
const entrypoint = path.resolve(__dirname, '..', 'client', 'index.html')
const bundler = new Parcel(entrypoint, {});
app.use(bundler.middleware());

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  const error = new Error("Not Found")
  error.status = 404
  next(error);
});

// error handler
app.use(function(err, req, res, next) {
  // only provide detailed error in development
  if(req.app.get('env') !== 'development') {
    err.stack = undefined
  }
  // render the error page
  res.status(err.status || 500).json(err)
});

module.exports = app;
