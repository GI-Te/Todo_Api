import mongoose from "mongoose";

const connectDB = async () => {
  return await mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};
export { connectDB };
 