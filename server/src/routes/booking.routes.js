import express from "express";
const router = express.Router();

import {
  addBooking,
  getBooking,
  getBookingBin,
  getBookingById,
  restoreBooking,
  softDeleteBooking,
  forceDeleteBooking,
  forceDeleteAllBooking,
} from "../controller/booking.controller";

const initBookingRouter = (app) => {
  router.post("/addBooking", addBooking);
  router.get("/getBooking", getBooking);
  router.get("/getBookingById/:id", getBookingById);
  router.get("/getBookingBin/", getBookingBin);
  router.patch("/restoreBooking/:id", restoreBooking);
  router.patch("/softDeleteBooking/:id", softDeleteBooking);
  router.delete("/forceDeleteBooking/:id", forceDeleteBooking);
  router.delete("/forceDeleteAllBooking/", forceDeleteAllBooking);

  return app.use("/booking/", router);
};

export default initBookingRouter;
