import mongoose from 'mongoose';
import config from 'config';
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
