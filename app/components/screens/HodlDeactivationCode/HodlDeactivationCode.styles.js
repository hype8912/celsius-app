// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  inputCel: {
    borderRadius: 10,
    flex: 1,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const HodlDeactivationCodeStyle = () => getThemedStyle(base, themed);

export default HodlDeactivationCodeStyle;
