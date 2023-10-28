import mongoose from "mongoose";

async function connectDb() {
  return mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendApi",
    })
    .then(() => console.log("MongoDB has been connected"));
}

export default connectDb;
