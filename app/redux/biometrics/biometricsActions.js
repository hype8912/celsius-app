import ACTIONS from "../../constants/ACTIONS";
import { isBiometricsSensorAvailable } from "../../utils/biometrics-util";

export { getBiometricType };

/**
 * Gets biometrics type available on device
 */
function getBiometricType() {
  return async dispatch => {
    const biometrics = await isBiometricsSensorAvailable();
    if (biometrics.available) {
      dispatch({
        type: ACTIONS.IS_BIOMETRIC_AVAILABLE,
        biometrics,
      });
    }
  };
}
