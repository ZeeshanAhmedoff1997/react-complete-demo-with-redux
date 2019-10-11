const mongoose= require('mongoose');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true
};
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

const MONGO_URL = 'mongodb://127.0.0.1:27017/rms'

mongoose.connect(MONGO_URL)
  .then(db => {
    console.log('MongoDB Connected');
  })
  .catch(err => console.log('MongoDB::', err));
