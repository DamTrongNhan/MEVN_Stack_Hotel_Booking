import { photosModel } from "../model/model.js";

export const getAllPhotos = async (req, res, next) => {
  photosModel
    .find({})
    .then((result) => res.status(200).json({ dataPhotos: result }))
    .catch((err) => res.status(500).json({ message: "Error Server", err }));
};
export const deleteAllPhotos = async (req, res, next) => {
  photosModel
    .deleteMany({})
    .then((result) =>
      res
        .status(200)
        .json({ status: true, message: "Delete all photos successfully" })
    )
    .catch((err) => res.status(500).json({ message: "Error Server", err }));
};
