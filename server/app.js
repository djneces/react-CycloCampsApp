const path = require('path');
const express = require('express');
// const cookieSession = require('cookie-session');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const viewRouter = require('./routes/viewRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
require('./services/passport');

// Start express app
const app = express();

// Heroku's proxy
app.enable('trust proxy');

// ***** GLOBAL MIDDLEWARES *****
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

// ***** SESSIONS ****
// app.use(
//   cookieSession({
//     //30days
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     //encrypt the id token
//     keys: [process.env.COOKIE_SECRET],
//   })
// );

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    //false for http
    cookie: { secure: false },
    unset: 'destroy',
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE,
    }),
  })
);

// ***** FLASH ****
app.use(flash());

// ***** PASSPORT ****
app.use(passport.initialize());
app.use(passport.session());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  console.log(req.isAuthenticated());
  next();
});

// ***** ROUTES *****
app.use('/', viewRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.use((req, res, next) => {
  console.log(req.isAuthenticated());

  next();
});

// 404 Page not found handling
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
