import express from "express";

import apiError from "./helper/api-error";
import cors from "cors";
import config from "./config/config";
import configPublic from "./config/public";

import initUserRouter from "./routes/user.routes";
import initRoomRouter from "./routes/room.routes";
import initBookingRouter from "./routes/booking.routes";
import initPhotosRouter from "./routes/photos.routes";

const port = config.app.PORT;
const app = express();

app.use(cors());
app.use(express.json({ limit: "70mb" }));
app.use(express.urlencoded({ limit: "70mb", extended: true }));
configPublic(app);

initUserRouter(app);
initRoomRouter(app);
initBookingRouter(app);
initPhotosRouter(app);

app.use((req, res, next) => {
  return next(new apiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Example is listening on port ${port} http://localhost:${port}`);
});
