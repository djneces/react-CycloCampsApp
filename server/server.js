if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: './config.env' });
}

const mongoose = require('mongoose');

//listening for an uncaught exception
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  //shutting down the app
  process.exit(1);
});

const app = require('./app');

//connection to the Mongo DB
const mongoURI = process.env.DATABASE;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error'));
db.once('open', () => {
  console.log('DB connection successful!');
});

//Connecting the app
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Serving at port ${port}...`);
});

//listening for an unhandled Rejection
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

//Heroku Sigterm
process.on('SIGTERM', () => {
  console.error('SIGTERM RECEIVED. Shutting down');
  server.close(() => {
    console.error('Process terminated!');
  });
});
