// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  outerCircle: {
    justifyContent: "center",
    alignItems: "center",
  },
  contentCircle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const PieProgressBarStyle = () => getThemedStyle(base, themed);

export default PieProgressBarStyle;
