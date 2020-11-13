import {
  getFontFamily,
  getFontSize,
  getScaledFont,
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  enterAmount: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchButton: {
    zIndex: 1,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 28,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLOR_KEYS.CARDS,
  },
  inputField: {
    fontFamily: getFontFamily("light"),
    color: COLOR_KEYS.PRIMARY_BUTTON,
    paddingVertical: 0,
    marginLeft: 22,
  },
  icon: {
    marginBottom: 28,
  },
  amountInputWrapper: {
    height: getScaledFont(getFontSize("H1")),
    width: widthPercentageToDP("65%"),
    justifyContent: "center",
    marginVertical: 10,
  },
  lowerValue: {
    height: getScaledFont(getFontSize("H2")),
    justifyContent: "center",
    alignItems: "center",
  },
  noIcon: {
    width: 50,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const CoinSwitchStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default CoinSwitchStyle;
