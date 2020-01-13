// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  buttonWrapper: {
    height: 50,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const BecomeCelMemberModalStyle = () => getThemedStyle(base, themed);

export default BecomeCelMemberModalStyle;
