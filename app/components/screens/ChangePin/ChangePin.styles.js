// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const ChangePinStyle = () => getThemedStyle(base, themed);

export default ChangePinStyle;
