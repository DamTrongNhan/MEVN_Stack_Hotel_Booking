import { bookingModel, roomModel } from "../model/model";

export const addBooking = async (req, res) => {
  console.log(1);
  const { _id } = req.body;
  const { allGuestInfo } = req.body;
  const { roomType, adult, children, days, checkinDate, checkoutDate } =
    req.body;

  const room = await roomModel.findOne({ _id });

  const createdAt = Date.now();

  const newDateRange = {
    start: new Date(checkinDate),
    end: new Date(checkoutDate),
  };

  const total_price = room.pricePerNight * days;

  const exists = await bookingModel.findOne({
    room_id: _id,
    isDelete: false,
    checkinDate: { $lte: new Date(checkoutDate) },
    checkoutDate: { $gte: new Date(checkinDate) },
  });
  if (exists) {
    return res
      .status(200)
      .json({ message: "Booking already exists", status: false });
  }

  try {
    const result = await bookingModel.create({
      room_id: _id,
      checkinDate: new Date(checkinDate),
      checkoutDate: new Date(checkoutDate),
      total_price,
      nights: days,
      createdAt,
    });
    await bookingModel.updateOne(
      { _id: result._id },
      { $push: { bookedDates: newDateRange, guest: allGuestInfo } }
    );
    return res.status(200).json({ status: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Err", err });
  }
};

export const getBooking = async (req, res) => {
  try {
    const result = await bookingModel.find({ isDelete: false }).populate();
    return res.status(200).json({ dataBooking: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Err", err });
  }
};
export const getBookingBin = async (req, res) => {
  try {
    const result = await bookingModel.find({ isDelete: true }).populate();
    return res.status(200).json({ dataBooking: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Err", err });
  }
};
export const getBookingById = async (req, res) => {
  console.log(req.params.id);
  try {
    const result = await bookingModel
      .findOne({ _id: req.params.id, isDelete: false })
      .populate();
    return res.status(200).json({ booking: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Err", err });
  }
};
export const restoreBooking = async (req, res) => {
  try {
    const result = await bookingModel.updateOne(
      { _id: req.params.id },
      { isDelete: false }
    );
    return res
      .status(200)
      .json({ status: true, message: "Phục hồi booking thành công" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Err", err });
  }
};
export const softDeleteBooking = async (req, res) => {
  try {
    const result = await bookingModel.updateOne(
      { _id: req.params.id },
      { isDelete: true }
    );
    return res.status(200).json({ status: true, message: "Đơn đặt đã bị xóa" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Err", err });
  }
};
export const forceDeleteBooking = async (req, res) => {
  try {
    const result = await bookingModel.deleteOne({
      _id: req.params.id,
      isDelete: true,
    });
    return res
      .status(200)
      .json({ status: true, message: "Đơn đặt đã bị xóa vĩnh viễn" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Err", err });
  }
};
export const forceDeleteAllBooking = async (req, res) => {
  try {
    const result = await bookingModel.deleteMany({ isDelete: true });
    return res
      .status(200)
      .json({ status: true, message: "Tất cả đơn đều bị xóa vĩnh viễn" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Err", err });
  }
};
