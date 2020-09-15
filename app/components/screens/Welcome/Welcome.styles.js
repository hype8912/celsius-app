import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: heightPercentageToDP("100%"),
    marginTop: -60,
  },
  celImage: {
    resizeMode: "contain",
    width: widthPercentageToDP("35%"),
    height: heightPercentageToDP("20%"),
  },
  title: {
    marginTop: heightPercentageToDP("2%"),
  },
  subtitle: {
    marginTop: heightPercentageToDP("2%"),
    marginRight: 25,
    marginLeft: 25,
  },
  button: {
    marginTop: heightPercentageToDP("3%"),
    marginBottom: heightPercentageToDP("2%"),
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const WelcomeStyle = () => getThemedStyle(base, themed);

export default WelcomeStyle;
