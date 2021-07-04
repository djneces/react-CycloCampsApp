const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');

const globalErrorHandler = require('./controllers/errorController');
const viewRouter = require('./routes/viewRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const campgroundRouter = require('./routes/campgroundRouter');
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
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      //false for http
      secure: false,
      httpOnly: true,
      SameSite: 'None',
      maxAge: 60 * 60 * 24 * 1000,
    },
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
app.use('/api/', viewRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/campgrounds', campgroundRouter);

// 404 Page not found handling
// app.all('*', (req, res, next) => {
//   next(
//     new AppError(
//       `Page not found - can't find ${req.originalUrl} on this server!`,
//       404
//     )
//   );
// });

//global error controller
app.use(globalErrorHandler);

module.exports = app;
