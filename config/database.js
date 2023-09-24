// ./config/database.js
import mongoose from 'mongoose';

const connectDatabase = () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // Other options...
  })
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
};

export { connectDatabase };