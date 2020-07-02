import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  wrapper: {
    alignItems: "center",
  },
  celImage: {
    resizeMode: "contain",
    width: widthPercentageToDP("35%"),
    height: heightPercentageToDP("20%"),
    marginTop: heightPercentageToDP("20%"),
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
