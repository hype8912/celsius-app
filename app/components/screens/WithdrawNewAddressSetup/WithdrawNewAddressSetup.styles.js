// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1
  },
  scanText: {
    color: STYLES.COLORS.CELSIUS_BLUE,
    textAlign: "left"
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const WithdrawalNewAddressSetupStyle = () => getThemedStyle(base, themed);

export default WithdrawalNewAddressSetupStyle;
