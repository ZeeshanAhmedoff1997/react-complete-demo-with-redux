import mongoose from 'mongoose'
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

const MONGO_URL = 'mongodb://127.0.0.1:27017/rms';

mongoose.connect(MONGO_URL)
.then((db) => {console.log('MongoDB Connected to RMS');})
.catch(err => console.log('Couldnot Connect to MongoDB RMS REASONS::', err));
