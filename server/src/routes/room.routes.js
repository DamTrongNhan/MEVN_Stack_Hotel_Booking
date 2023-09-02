import express from "express";

import roomController from "../controller/room.controller";

import multer from "multer";
import path from "path";
import appRoot from "app-root-path";
import helpers from "../helper/checkImg";

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, appRoot + "/src/public/assets/uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const uploadMultiple = multer({
  storage: storage,
  fileFilter: helpers.imageFilter,
}).array("files", 10);

const Router = express.Router();

const initRoomRouter = (app) => {
  Router.route("/")
    .get(roomController.getAll)
    .post((req, res, next) => {
      uploadMultiple(req, res, (err) => {
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_UNEXPECTED_FILE"
        ) {
          res.status(400).json({
            message: "Bạn đã tải lên file vượt giới hạn cho phép",
            status: false,
          });
        } else if (err) {
          res.status(500).json({ err });
        } else {
          next();
        }
      });
    }, roomController.create)
    .delete(roomController.deleteAll);
  // Router.get("/search",roomController.search);
  Router.route("/:id")
    .get(roomController.getOne)
    .patch((req, res, next) => {
      uploadMultiple(req, res, (err) => {
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_UNEXPECTED_FILE"
        ) {
          res.status(400).json({
            message: "Bạn đã tải lên file vượt giới hạn cho phép",
            status: false,
          });
        } else if (err) {
          res.status(500).json({ err });
        } else {
          next();
        }
      });
    }, roomController.updateOne)
    .delete(roomController.deleteOne);
  return app.use("/room", Router);
};

export default initRoomRouter;
