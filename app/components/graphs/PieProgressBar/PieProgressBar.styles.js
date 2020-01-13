// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  heightPercentageToDP,
} from "../../../utils/styles-util";

const height = heightPercentageToDP("23.5%");

const base = {
  container: {
    flex: 1,
  },
  outerCircle: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    height: heightPercentageToDP("20.3%"),
    width: heightPercentageToDP("20.3%"),
    borderRadius: height / 2,
  },
  innerCircle: {
    position: "absolute",
    top: heightPercentageToDP("0.8%"),
    left: heightPercentageToDP("0.8%%"),
    width: heightPercentageToDP("18.7%"),
    height: heightPercentageToDP("18.7%"),
    borderRadius: height / 2,
  },
  contentCircle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: heightPercentageToDP("1.65%"),
    left: heightPercentageToDP("1.65%"),
    width: heightPercentageToDP("17%"),
    height: heightPercentageToDP("17%"),
    borderRadius: height / 2,
    // backgroundColor: "rgba(255,255,255,0.3)"
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const PieProgressBarStyle = () => getThemedStyle(base, themed);

export default PieProgressBarStyle;
