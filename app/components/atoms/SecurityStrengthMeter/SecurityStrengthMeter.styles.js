// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: heightPercentageToDP("8%"),
  },
  leftSide: {
    flex: 0.5,
    justifyContent: "flex-start",
  },

  rightSide: {
    flex: 0.5,
    justifyContent: "flex-end",
  },
  meter: {
    width: widthPercentageToDP("40%"),
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const SecurityStrengthMeterStyle = () => getThemedStyle(base, themed);

export default SecurityStrengthMeterStyle;
