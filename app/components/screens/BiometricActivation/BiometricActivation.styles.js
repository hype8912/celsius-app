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
    width: widthPercentageToDP("15%"),
    height: heightPercentageToDP("15%"),
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

const BiometricActivationStyle = () => getThemedStyle(base, themed);

export default BiometricActivationStyle;
