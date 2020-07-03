import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {},
  contentWrapper: {
    alignItems: "center",
  },
  celImage: {
    resizeMode: "contain",
    width: widthPercentageToDP("35%"),
    height: heightPercentageToDP("20%"),
    marginTop: heightPercentageToDP("20%"),
  },
  partnerLogos: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  logoLeft: {
    resizeMode: "contain",
    width: widthPercentageToDP("22%"),
  },
  logoMiddle: {
    resizeMode: "contain",
    width: widthPercentageToDP("22"),
  },
  logoRight: {
    resizeMode: "contain",
    width: widthPercentageToDP("22%"),
  },
};

const themed = {
  dark: {},

  light: {},

  unicorn: {},
};

const HomeStyle = () => getThemedStyle(base, themed);

export default HomeStyle;
