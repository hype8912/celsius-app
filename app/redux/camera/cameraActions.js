import { CameraRoll } from "react-native";

import ACTIONS from "../../constants/ACTIONS";
import { apiError, startApiCall } from "../api/apiActions";
import { showMessage } from "../ui/uiActions";
import API from "../../constants/API";


export {
  getCameraRollPhotos,
  takeCameraPhoto,
  flipCamera,
  activateCamera,
  retakePhoto,
};

/**
 * Gets next batch of photos from Camera Roll
 */
function getCameraRollPhotos() {
  return async (dispatch, getState) => {
    const { camera } = getState();

    if (!camera.hasMore) return;

    const config = {
      after: camera.lastPhotoCursor,
      first: 30,
      assetType: "Photos"
    };

    dispatch(startApiCall(API.GET_CAMERA_ROLL));

    try {
      const photos = await CameraRoll.getPhotos(config);
      // console.log('photos', photos)
      dispatch(getCameraRollPhotosSuccess(photos));
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_CAMERA_ROLL, err));
    }
  };
}


/**
 * TODO add JSDoc
 */
function getCameraRollPhotosSuccess(photos) {
  return {
    type: ACTIONS.GET_CAMERA_ROLL_SUCCESS,
    callName: API.GET_CAMERA_ROLL,
    photos
  };
}


/**
 * Takes camera photo
 * @returns {Object} - Action
 */
function takeCameraPhoto(photo) {
  return {
    type: ACTIONS.TAKE_CAMERA_PHOTO,
    callName: API.TAKE_CAMERA_PHOTO,
    photo
  };
}


/**
 * Clears the photo and goes back to Camera screen
 * @returns {Object} - Action
 */
function retakePhoto() {
  return {
    type: ACTIONS.RETAKE_PHOTO
  };
}


/**
 * Flips front and back camera
 * @returns {Object} - Action
 */
function flipCamera() {
  return {
    type: ACTIONS.FLIP_CAMERA
  };
}


/**
 * Sets Camera properties
 * @params {Object} cameraProps - @todo add props
 * @returns {Object} - Action
 */
function activateCamera(cameraProps) {
  return dispatch => {
    dispatch({
      type: ACTIONS.ACTIVATE_CAMERA,
      ...cameraProps
    });
  };
}
