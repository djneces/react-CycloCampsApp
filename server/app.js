const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const viewRouter = require('./routes/viewRouter');

// Start express app
const app = express();

// Heroku's proxy
app.enable('trust proxy');

// 1) GLOBAL MIDDLEWARES
// Enable CORS
app.use(cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser, parsing data from the body -> req.body
app.use(express.json({ limit: '50mb' }));
// Parsing url string
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// Cookie parsing
app.use(cookieParser());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  // console.log(req.cookies);
  next();
});

// 2) ROUTES
app.use('/', viewRouter);

// 404 Page not found handeling
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Page not found - can't find ${req.originalUrl} on this server!`,
      404
    )
  );
});

//global error controller
app.use(globalErrorHandler);

module.exports = app;
