import mongoose from "mongoose";
import config from "./config";

mongoose
  // .set("strictQuery", false)
  .connect(config.db.URI)
  .then(() => console.log("Connected DB!"))
  .catch((err) => console.log(err));

export default mongoose;
