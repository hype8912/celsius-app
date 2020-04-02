import RNUxcam from "react-native-ux-cam";
import loggerUtil from "./logger-util";

export{
    initUxCam
};

async function initUxCam() {

  try {
    await RNUxcam.optIntoSchematicRecordings(); // for enabling iOS screen recordings
    await RNUxcam.startWithKey("9hfcebj8jl88oba"); // Add this line after RNUcam.optIntoSchematicRecordings();
  } catch(err) {
    loggerUtil.log(err)
  }
}



