import mongoose from "mongoose";

const dbConnectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@sivakumar.yhfef3z.mongodb.net/bikeService?retryWrites=true&w=majority`;

const ConnectDb = async () => {
  try {
    await mongoose.connect(dbConnectionString);
    console.log("💾 mongoDb connected");
  } catch (error) {
    console.log("error in mongoDb connection", error);
  }
};

export default ConnectDb;
