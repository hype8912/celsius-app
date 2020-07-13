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
    marginBottom: 20,
  },
  halfCircle: {
    backgroundColor: STYLES.COLORS.WHITE_OPACITY2,
    paddingHorizontal: 10,
    marginRight: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    borderTopRightRadius: heightPercentageToDP("50%"),
    borderBottomRightRadius: heightPercentageToDP("50%"),
  },
  image: {
    resizeMode: "contain",
    marginRight: heightPercentageToDP("3%"),
    width: 40,
    height: 40,
  },
  textAlignment: {
    flex: 0.8,
    alignItems: "flex-start",
    marginTop: heightPercentageToDP("1.7%"),
  },
  buttonsWrapper: {
    flexDirection: "row",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const BannerStyle = () => getThemedStyle(base, themed);

export default BannerStyle;
