import { Schema } from "mongoose";
import mongoose from "../config/connectDB";

const userSchema = new Schema(
  {
    name: { type: String },
    phone: { type: String },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String },
    CIC: { type: String },
    googleId: {
      type: String,
    },
    country: { type: String },
    city: { type: String },
    address: { type: String },
    role: { type: String, default: "user" },
    open: { type: Boolean, default: true },
    avatar: { type: String },
  },
  { collection: "user", timestamps: true }
);
const photosSchema = new Schema({
  roomId: { type: Schema.Types.ObjectId, ref: "room" },
  type: { type: String, default: "room" },
  name: { type: String },
});
const roomSchema = new Schema(
  {
    roomNumber: { type: Number },
    roomType: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    description: { type: String },
    photos: [{ type: Schema.Types.ObjectId, default: [], ref: "photos" }],
    bookedDates: [{ start: Date, end: Date }],
    bed: { type: String },
    star: { type: Number },
    amenities: [
      {
        type: String,
      },
    ],
    status: { type: Number, default: 1 },
    rating: { type: Number },
    locked: { type: Number, default: 2 },
    reviews: [
      {
        type: String,
      },
    ],
  },
  { collection: "room", timestamps: true }
);
const dataGuestSchema = new Schema({
  name: { type: String },
  age: { type: Number },
  sex: { type: String },
  CCCD: { type: String },
  email: { type: String },
  phone: { type: String },
  comment: { type: String },
});
const bookingSchema = new Schema(
  {
    bookingType: {
      type: String,
      default: "vnpay",
      required: true,
    },
    // user_id: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
    room_id: {
      type: Schema.Types.ObjectId,
      ref: "room",
    },
    bookedDates: [{ start: Date, end: Date }],
    guest: [dataGuestSchema],
    checkinDate: {
      type: Date,
      required: true,
    },
    checkoutDate: {
      type: Date,
      required: true,
    },
    status: { type: Number, default: 1 },
    total_price: { type: Number },
    nights: { type: Number },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isDelete: { type: Boolean, default: false },
  },
  { collection: "booking", timestamps: true }
);

export const userModel = mongoose.model("user", userSchema);
export const photosModel = mongoose.model("photos", photosSchema);
export const roomModel = mongoose.model("rooms", roomSchema);
// export const dataGuestModel = mongoose.model("dataGuest", dataGuestSchema);
export const bookingModel = mongoose.model("booking", bookingSchema);
