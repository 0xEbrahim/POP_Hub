import mongoose from "mongoose";
import env from "@Shared/constants/env";

export const mongoConnection = async () => {
  await mongoose
    .connect(env.MONGO_URI)
    .then(() => console.log("MongoDb connected successfully."))
    .catch((err) => console.error(err));
};
