// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  themeBtn: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const AppearanceStyle = () => getThemedStyle(base, themed);

export default AppearanceStyle;
