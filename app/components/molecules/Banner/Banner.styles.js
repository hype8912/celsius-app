import {
  getThemedStyle,
  heightPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flexDirection: "row",
    flex: 1,
    marginRight: -20,
    marginLeft: -20,
    marginTop: -20,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  circleWrapper: {
    flex: 0.2,
  },
  halfCircle: {
    backgroundColor: COLOR_KEYS.WHITE,
    opacity: 0.15,
    paddingHorizontal: 10,
    marginLeft: -10,
    marginRight: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    borderTopRightRadius: heightPercentageToDP("50%"),
    borderBottomRightRadius: heightPercentageToDP("50%"),
  },
  image: {
    resizeMode: "contain",
    marginRight: heightPercentageToDP("1%"),
    marginLeft: 10,
    width: 40,
    height: 40,
    position: "absolute",
    top: "40%",
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

  unicorn: {},
};

const BannerStyle = () => getThemedStyle(base, themed);

export default BannerStyle;
