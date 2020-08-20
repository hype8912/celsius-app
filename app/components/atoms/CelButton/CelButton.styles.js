import {
  getThemedStyle,
  getScaledFont,
  getFontSize,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    opacity: 1,
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON,
    borderColor: COLOR_KEYS.PRIMARY_BUTTON,
  },
  mediumContainer: {
    borderRadius: 60,
    paddingLeft: 35,
    paddingRight: 35,
    height: 50,
  },
  smallContainer: {
    borderRadius: 40,
    paddingLeft: 20,
    paddingRight: 20,
    height: 35,
  },
  loader: {
    width: 30,
    height: 30,
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: "transparent",
    borderWidth: 2,
  },
  basicButton: {
    borderColor: "transparent",
    backgroundColor: "transparent",
    height: "auto",
    paddingLeft: 0,
    paddingRight: 0,
  },
  baseTitle: {
    textAlign: "center",
    color: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
  },
  mediumTitle: {
    fontSize: getScaledFont(getFontSize("H4")),
  },
  smallTitle: {
    fontSize: getScaledFont(getFontSize("H6")),
  },
  ghostButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLOR_KEYS.PRIMARY_BUTTON,
  },
  ghostredButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLOR_KEYS.NEGATIVE_STATE,
  },
  ghostgreenButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
  },
  basicredButton: {
    margin: 20,
  },
  basicgreenButton: {
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
  },
  ghostColorTitle: {
    color: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
  },
  greenButton: {
    backgroundColor: COLOR_KEYS.POSITIVE_STATE,
  },
  redButton: {
    backgroundColor: COLOR_KEYS.NEGATIVE_STATE,
  },
  whiteButton: {
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
  },
  basicredTitleButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: COLOR_KEYS.NEGATIVE_STATE,
  },
  basicgreenTitleButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  basicTitle: {
    color: COLOR_KEYS.PRIMARY_BUTTON,
  },
  disabledTitleColor: {
    color: COLOR_KEYS.PRIMARY_BUTTON,
  },
  ghostTitle: {
    color: COLOR_KEYS.PRIMARY_BUTTON,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {
    basicTitle: {
      textDecorationLine: "underline",
    },
  },
};

const CelButtonStyle = () => getThemedStyle(base, themed);

export default CelButtonStyle;
