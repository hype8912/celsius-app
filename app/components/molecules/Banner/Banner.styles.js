// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  heightPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flexDirection: "row",
    flex: 1,
    marginRight: -20,
    marginLeft: -20,
    marginTop: -20,
    paddingHorizontal: 5,
  },
  circleWrapper: {
    flex: 0.2,
  },
  halfCircle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: heightPercentageToDP("2%"),
    left: -heightPercentageToDP("14%"),
    height: heightPercentageToDP("22%"),
    width: heightPercentageToDP("22%"),
    borderRadius: heightPercentageToDP("11%"),
    backgroundColor: STYLES.COLORS.WHITE_OPACITY2,
  },
  image: {
    resizeMode: "contain",
    marginRight: heightPercentageToDP("2%"),
    width: heightPercentageToDP("6%"),
    height: heightPercentageToDP("6%"),
  },
  textAlignment: {
    flex: 0.8,
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginTop: heightPercentageToDP("1.7%"),
  },
  buttonsWrapper: {
    flexDirection: "row",
    marginTop: 10,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const BannerStyle = () => getThemedStyle(base, themed);

export default BannerStyle;
