import mongoose from "mongoose";
import "dotenv/config";

async function connectMongoose() {
  try {
    await mongoose.connect(process.env.DB_URL);
    const collections = (
      await mongoose.connection.db.listCollections().toArray()
    ).map((el) => el.name);
    console.log("connected to db: ", collections);
    return true;
  } catch (err) {
    console.error("could not connect to mongoose", err);
    return false;
  }
}

export { connectMongoose };
