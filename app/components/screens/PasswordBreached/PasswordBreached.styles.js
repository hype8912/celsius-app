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
  image: {
    resizeMode: "contain",
    width: widthPercentageToDP("35%"),
    height: heightPercentageToDP("20%"),
    marginTop: heightPercentageToDP("20%"),
  },
  title: {},
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

const PasswordBreachedStyle = () => getThemedStyle(base, themed);

export default PasswordBreachedStyle;
