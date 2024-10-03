import mongoose from 'mongoose';

const connectToDb = async () => {
  try {
    const connectionResult = await mongoose.connect(
      process.env.MONGOOSE_CONNECTION
    );
    console.log('connected to database'.green);
  } catch (e) {
    console.log('Something went wrong during connect to database'.red);
    console.log(e);
  }
};

export default connectToDb;
