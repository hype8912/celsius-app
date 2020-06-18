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
    marginTop: heightPercentageToDP("3%"),
  },
  button: {
    marginTop: heightPercentageToDP("3%"),
    marginBottom: heightPercentageToDP("2%"),
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const SixDigitPinExplanationStyle = () => getThemedStyle(base, themed);

export default SixDigitPinExplanationStyle;
