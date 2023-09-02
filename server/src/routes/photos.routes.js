import express from "express";
const router = express.Router();

import { getAllPhotos, deleteAllPhotos } from "../controller/photos.controller";

const initPhotosRouter = (app) => {
  router.get("/getAllPhotos", getAllPhotos);
  router.delete("/deleteAllPhotos", deleteAllPhotos);
  return app.use("/photos/", router);
};

export default initPhotosRouter;
