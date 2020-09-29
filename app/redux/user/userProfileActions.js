import ACTIONS from "../../constants/ACTIONS";
import API from "../../constants/API";
import { apiError, startApiCall } from "../api/apiActions";
import { showMessage } from "../ui/uiActions";
import userProfileService from "../../services/user-profile-service";
import { deleteSecureStoreKey } from "../../utils/storage-util";
import { SCREENS } from "../../constants/SCREENS";
import { STORAGE_KEYS } from "../../constants/DATA";

export {
  getProfileInfo,
  updateProfilePicture,
  getUserPersonalInfoSuccess,
  getPreviousPinScreen, // TODO what is this?
};

/**
 * Gets profile info for user
 */
function getProfileInfo() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_USER_PERSONAL_INFO));

    try {
      const personalInfoRes = await userProfileService.getPersonalInfo();
      const personalInfo = personalInfoRes.data.profile || personalInfoRes.data;
      dispatch(getUserPersonalInfoSuccess(personalInfo));
    } catch (err) {
      if (err.status === 422) {
        deleteSecureStoreKey(STORAGE_KEYS.SECURITY_STORAGE_AUTH_KEY);
      }
      if (
        err.msg !==
        "You've been inactive for a while, so we've logged you out to help protect your account. Please login again."
      ) {
        dispatch(showMessage("error", err.msg));
      }
      dispatch(apiError(API.GET_USER_PERSONAL_INFO, err));
    }
  };
}

function getUserPersonalInfoSuccess(personalInfo) {
  return {
    type: ACTIONS.GET_USER_PERSONAL_INFO_SUCCESS,
    callName: API.GET_USER_PERSONAL_INFO,
    personalInfo,
  };
}

/**
 * Updates users profile picture
 * @param {Object} image - image taken from camera
 */
function updateProfilePicture(image) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.UPLOAD_PLOFILE_IMAGE));
      const res = await userProfileService.setProfileImage(image);
      dispatch(updateProfilePictureSuccess(res.data.img_url));
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.UPLOAD_PLOFILE_IMAGE, err));
    }
  };
}

function updateProfilePictureSuccess(image) {
  return {
    type: ACTIONS.UPLOAD_PLOFILE_IMAGE_SUCCESS,
    callName: API.UPLOAD_PLOFILE_IMAGE,
    image,
  };
}

function getPreviousPinScreen(activeScreen) {
  return async dispatch => {
    dispatch(startApiCall(API.GET_PREVIOUS_SCREEN));
    let screen;
    try {
      if (activeScreen !== SCREENS.VERIFY_PROFILE) {
        screen = activeScreen;
        dispatch({
          type: ACTIONS.GET_PREVIOUS_SCREEN_SUCCESS,
          callName: API.GET_PREVIOUS_SCREEN,
          screen,
        });
      }
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_PREVIOUS_SCREEN, err));
    }
  };
}
