// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  spinner: { alignItems: "center", justifyContent: "center" },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const InterestPaymentSettingsStyle = () => getThemedStyle(base, themed);

export default InterestPaymentSettingsStyle;
