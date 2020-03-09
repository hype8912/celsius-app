// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: widthPercentageToDP("25%"),
    height: widthPercentageToDP("25%"),
    borderRadius: widthPercentageToDP("25%") / 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  mail: {
    width: widthPercentageToDP("10%"),
    height: heightPercentageToDP("4%"),
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const CheckYourEmailStyle = () => getThemedStyle(base, themed);

export default CheckYourEmailStyle;
