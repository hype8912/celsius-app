// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  fillColor: {},
  pngIcon: {
    height: 20,
    width: 20,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const IconStyle = () => getThemedStyle(base, themed);

export default IconStyle;
