import {
  checkIfValuesIsEmptyNullUndefined,
  sendCreated,
  sendDeleteSuccess,
  sendNotFound,
  sendServerError,
} from "../helpers/helperFunctions.js";
import {
  createPhotoService,
  deletePhotoService,
  getPhotosService,
  updatePhotoService,
} from "../services/photoServices.js";

import { photoValidator } from "../validators/photoValidator.js";

export const getPhotos = async (req, res) => {
  try {
    const data = await getPhotosService();
    if (data.length == 0) {
      sendNotFound(res, "No photos found");
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
};

export const getPhotosById = async (req, res) => {
  try {
    const data = await getPhotosService();

    const photo = data.find((item) => item.PhotoID == req.params.id);
    if (!photo) {
      sendNotFound(res, "Photo not found");
    } else {
      res.status(200).json(photo);
    }
  } catch {
    res.status(500).send("Server Error");
  }
};

export const createPhoto = async (req, res) => {
  const { UserID, PhotoURL, UploadDate } = req.body;
  const { error } = photoValidator({
    UserID,
    PhotoURL,
    UploadDate,
  });
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    try {
      const newPhoto = {
        UserID,
        PhotoURL,
        UploadDate,
      };
      const response = await createPhotoService(newPhoto);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendCreated(res, "Photo created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const updatePhoto = async (req, res) => {
  try {
    //console.log("Attempt made");
    const data = await getPhotosService();
    const photo = data.find((item) => item.PhotoID == req.params.id);
    if (!photo) {
      sendNotFound(res, "Photo to update not found");
    } else {
      if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
        const { UserID, PhotoURL, UploadDate } = req.body;
        const { error } = photoValidator({
          UserID,
          PhotoURL,
          UploadDate,
        });
        if (error) {
          res.status(400).send(error.details[0].message);
        } else {
          if (UserID) {
            photo.UserID = UserID;
          }
          if (PhotoURL) {
            photo.PhotoURL = PhotoURL;
          }
          if (UploadDate) {
            photo.UploadDate = UploadDate;
          }
          const updatedPhoto = await updatePhotoService(photo);
          console.log(updatedPhoto);
          sendCreated(res, "Photo updated successfully");
        }
      } else {
        sendServerError(res, "Please provide a complete field");
      }
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const deletePhoto = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getPhotosService();
    //console.log(data);
    const photoToDelete = data.find((item) => item.PhotoID == id);
    //console.log(userToDelete);
    if (!photoToDelete) {
      sendNotFound(res, "Photo not found");
    } else {
      await deletePhotoService(id);
      sendDeleteSuccess(res, `Photo with ID ${id} deleted successfully`);
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};
