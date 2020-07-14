import {
  getThemedStyle,
  heightPercentageToDP,
  // widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
    height: heightPercentageToDP("95%"),
  },

  contentWrapper: {
    flex: 0.8,
  },

  buttonWrapper: {
    flex: 0.2,
  },
  infoBoxWrapper: {
    flexDirection: "row",
  },
  infoBoxIconWrapper: {
    flex: 0.15,
    paddingRight: 5,
  },
  infoBoxTextWrapper: {
    flex: 0.85,
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

const ActivateSixDigitPinStyle = () => getThemedStyle(base, themed);

export default ActivateSixDigitPinStyle;
