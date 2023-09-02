import express from "express";

import userController from "../controller/user.controller";

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

const upload = multer({
  storage: storage,
  fileFilter: helpers.imageFilter,
});

const router = express.Router();

const initUserRouter = (app) => {
  router.get("/getAllUser", userController.getAllUser);
  router.get("/getAllAdmin", userController.getAllAdmin);
  router.get("/getOne/:id", userController.getOne);
  // router.get("/search", userController.search);
  router.post("/signIn", userController.signIn);
  router.post("/signUp", userController.signUp);
  router.get("/checkUser", userController.checkUser);
  router.post("/create", upload.single("file"), userController.create);
  router
    .route("/:userId")
    .patch(upload.single("file"), userController.update)
    .delete(userController.deleteOne);
  router.patch("/toggle/:userId", userController.toggle);

  return app.use("/user", router);
};

module.exports = initUserRouter;
