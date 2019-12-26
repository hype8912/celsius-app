// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    marginRight: -20,
    marginLeft: -20,
    marginTop: -20,
  },
  mainWrapper: {
    flexDirection: "row",
  },
  halfCircleRight: {
    position: "absolute",
    marginTop: heightPercentageToDP("2%"),
    left: -heightPercentageToDP("13%"),
    height: heightPercentageToDP("22%"),
    width: heightPercentageToDP("22%"),
    backgroundColor: STYLES.COLORS.WHITE_OPACITY2,
    borderRadius: heightPercentageToDP("11%"),
    justifyContent: "center",
    alignItems: "flex-end",
  },
  textAlignment: {
    marginTop: heightPercentageToDP("1.7%"),
    alignItems: "flex-start",
    paddingLeft: widthPercentageToDP("22%"),
    paddingRight: widthPercentageToDP("2%"),
  },
  image: {
    marginRight: heightPercentageToDP("3%"),
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  dotWrapper: {
    width: 48,
    height: 26,
    flexDirection: "row",
  },
  dot: {
    height: 6,
    width: 6,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 3,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const BannerStyle = () => getThemedStyle(base, themed);

export default BannerStyle;
