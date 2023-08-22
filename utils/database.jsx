import mongoose from "mongoose";
let isConnected = false; //track the connection
let uri = process.env.MONGODB_URI;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true); // always do these,  this sets the mongoose options

  if (isConnected) {
    console.log("Mongodb is already connected");
    return;
  }
  try {
    await mongoose.connect(uri, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // bufferCommands: false,
    });
    isConnected = true;
    console.log("mongodb is connected");
  } catch (error) {
    console.log(error.msg);
  }
};
