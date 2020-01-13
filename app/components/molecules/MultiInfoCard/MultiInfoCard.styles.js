// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  cardWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  image: {
    width: widthPercentageToDP("9%"),
    height: heightPercentageToDP("5.3%"),
    resizeMode: "contain",
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: heightPercentageToDP("1.1%"),
  },
  icon: { marginTop: heightPercentageToDP("2.5%") },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const MultiInfoCardStyle = () => getThemedStyle(base, themed);

export default MultiInfoCardStyle;
