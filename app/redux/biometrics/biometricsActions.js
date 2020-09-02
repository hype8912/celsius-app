import ACTIONS from "../../constants/ACTIONS";
import { isBiometricsSensorAvailable } from "../../utils/biometrics-util";
import { BIOMETRIC_TYPES } from "../../constants/UI";

export { getBiometricType };

/**
 * Gets biometrics type available on device
 */
function getBiometricType() {
  return async dispatch => {
    const biometrics = await isBiometricsSensorAvailable();
    if (biometrics.available) {
      const biometricType =
        biometrics.biometryType ===
        (BIOMETRIC_TYPES.BIOMETRICS || BIOMETRIC_TYPES.TOUCH_ID)
          ? BIOMETRIC_TYPES.TOUCH_ID
          : BIOMETRIC_TYPES.FACE_ID;

      dispatch({
        type: ACTIONS.IS_BIOMETRIC_AVAILABLE,
        biometrics: {
          ...biometrics,
          biometryType: biometricType,
        },
      });
    }
  };
}
