// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    flexDirection: "column",
    justifyContent: "center",
    height: heightPercentageToDP("12%"),
  },

  section: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
  },

  leftSide: {
    flex: 0.55,
    justifyContent: "flex-start",
  },

  rightSide: {
    flex: 0.45,
    justifyContent: "flex-end",
  },
  meter: {
    height: heightPercentageToDP("2%"),
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
