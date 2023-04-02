import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`connected to database ${conn.connection.host}`);
  } catch (error) {
    console.log(` this is error ${error}`);
  }
};

export default connectDB;
