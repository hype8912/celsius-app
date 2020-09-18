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
    backgroundColor: COLOR_KEYS.TRANSPARENT,
    borderWidth: 2,
  },
  basicButton: {
    borderColor: COLOR_KEYS.TRANSPARENT,
    backgroundColor: COLOR_KEYS.TRANSPARENT,
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
    backgroundColor: COLOR_KEYS.TRANSPARENT,
    borderWidth: 1,
    borderColor: COLOR_KEYS.PRIMARY_BUTTON,
  },
  ghostredButton: {
    backgroundColor: COLOR_KEYS.TRANSPARENT,
    borderWidth: 1,
    paddingHorizontal: 35,
    borderColor: COLOR_KEYS.NEGATIVE_STATE,
  },
  ghostgreenButton: {
    backgroundColor: COLOR_KEYS.TRANSPARENT,
    borderWidth: 1,
    borderColor: COLOR_KEYS.POSITIVE_STATE,
  },
  ghostwhiteButton: {
    backgroundColor: COLOR_KEYS.TRANSPARENT,
    borderWidth: 1,
    borderColor: COLOR_KEYS.WHITE,
    paddingHorizontal: 35,
    borderRadius: 60,
    height: 35,
  },
  basicredButton: {
    margin: 20,
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
  },
  basicgreenButton: {
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
  },
  basicwhiteButton: {
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
  },
  ghostColorTitle: {
    color: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
  },
  greenghostTitle: {
    color: COLOR_KEYS.POSITIVE_STATE,
  },
  redghostTitle: {
    color: COLOR_KEYS.NEGATIVE_STATE,
  },
  greenButton: {
    borderRadius: 60,
    paddingLeft: 35,
    paddingRight: 35,
    height: 35,
    backgroundColor: COLOR_KEYS.POSITIVE_STATE,
  },
  redButton: {
    backgroundColor: COLOR_KEYS.NEGATIVE_STATE,
  },
  whiteButton: {
    backgroundColor: COLOR_KEYS.WHITE,
  },
  basicredTitleButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: COLOR_KEYS.NEGATIVE_STATE,
  },
  basicwhiteTitleButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: COLOR_KEYS.WHITE,
  },
  basicgreenTitleButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: COLOR_KEYS.POSITIVE_STATE,
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

const CelButtonStyle = theme => getThemedStyle(base, themed, theme);

export default CelButtonStyle;
