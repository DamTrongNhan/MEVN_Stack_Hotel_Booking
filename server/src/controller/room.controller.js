import { roomModel, photosModel } from "../model/model.js";

const create = async (req, res, next) => {
  if (req.fileValidationError) {
    return res.status(400).json({ err: req.fileValidationError });
  } else if (req.files.length === 0) {
    return res
      .status(400)
      .json({ message: "Please select an image to upload", status: false });
  }
  const files = req.files;
  await roomModel
    .create(JSON.parse(req.body.data))
    .then(async (room) => {
      const filesId = await Promise.all(
        await files.map(async (item) => {
          let id = "";
          await photosModel
            .create({
              roomId: room._id,
              name: item.filename,
            })
            .then(async (res) => {
              id = res._id;
            });
          return id;
        })
      );
      // console.log(filesId);
      await roomModel.updateOne({ _id: room._id }, { photos: filesId });
      return res
        .status(200)
        .json({ message: "Create room successfully.", status: true });
    })
    .catch((e) => res.status(500).json({ message: "Error Server", err: e }));
};

export const getAll = async (req, res, next) => {
  roomModel
    .find({})
    .populate("photos", "name")
    .then((result) => res.status(200).json({ dataRoom: result }))
    .catch((err) => res.status(500).json({ message: "Error Server", err }));
};
export const getOne = async (req, res, next) => {
  roomModel
    .findOne({ _id: req.params.id })
    .populate("photos", "name")
    .then((result) => res.status(200).json({ room: result }))
    .catch((e) => res.status(500).json({ e }));
};
export const updateOne = async (req, res, next) => {
  const files = req.files;
  const data = JSON.parse(req.body.data);
  const id = req.params.id;

  if (req.files.length !== 0) {
    try {
      await photosModel.deleteMany({ roomId: id });
      const room = await roomModel.findOneAndUpdate({ _id: id }, data);
      const filesId = await Promise.all(
        await files.map(async (item) => {
          let id = "";
          const photos = await photosModel.create({
            roomId: room._id,
            name: item.filename,
          });
          id = photos._id;
          return id;
        })
      );
      // console.log(filesId);
      await roomModel.updateOne({ _id: room._id }, { photos: filesId });
      return res
        .status(200)
        .json({ message: "Update room successfully.", status: true });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Error Server", status: false, err: e });
    }
  } else {
    try {
      await roomModel.updateOne({ _id: id }, data);
      return res
        .status(200)
        .json({ message: "Update room successfully.", status: true });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Server Error", status: false, err: err });
    }
  }
};
export const deleteOne = async (req, res) => {
  console.log(req.params.id);
  await photosModel
    .deleteMany({ roomId: req.params.id })
    .then((result) => console.log(result))
    .catch((err) => res.status(500).json({ err }));
  await roomModel
    .deleteOne({ _id: req.params.id })
    .then((result) => res.status(200).json({ message: "Delete successfully" }))
    .catch((e) => res.status(500).json({ e }));
};
export const deleteAll = async (req, res, next) => {
  roomModel
    .deleteMany({})
    .then((result) =>
      res.status(200).json({ message: "Delete all room successfully" })
    )
    .catch((e) => res.status(500).json({ e }));
};

module.exports = {
  create,
  deleteOne,
  deleteAll,
  updateOne,
  getOne,
  getAll,
};

