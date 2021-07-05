// RUNNING SEEDS SEPARATELY FROM THE APP.JS  -> seeds data into the database
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors, campingWords } = require('./seedHelpers');
const Campground = require('../../models/CampgroundModel');

//DB connection via Mongoose
const mongoURI = DATABASE;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

//generating fake seed names
const seedDB = async () => {
  await Campground.deleteMany({}); //removes all first
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    //new campground creation
    const camp = new Campground({
      author: '60c6303a94fe3ecd0dc2442b',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        `https://source.unsplash.com/random/?${sample(
          campingWords
        )},sig=${random1000}`,
      ],
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora quae nemo harum optio voluptas dolor incidunt ex quis, saepe excepturi.',
      price: price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

//closing connection
seedDB().then(() => {
  db.close();
});
