import {
  getThemedStyle,
  getScaledFont,
  getFontSize,
  getColor,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    opacity: 1,
    backgroundColor: getColor(COLOR_KEYS.PRIMARY_BUTTON),
    borderColor: getColor(COLOR_KEYS.PRIMARY_BUTTON),
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
    color: getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND),
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
    borderColor: getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND),
  },
  ghostredButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND),
  },
  ghostgreenButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND),
  },
  basicredButton: {
    backgroundColor: getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND),
    margin: 20,
  },
  basicgreenButton: {
    backgroundColor: getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND),
  },
  ghostColorTitle: {
    color: getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND),
  },
  ghostTitle: {
    color: getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND),
  },
  greenButton: {
    backgroundColor: getColor(COLOR_KEYS.POSITIVE_STATE),
  },
  redButton: {
    backgroundColor: getColor(COLOR_KEYS.NEGATIVE_STATE),
  },
  whiteButton: {
    backgroundColor: getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND),
  },
  basicredTitleButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  basicgreenTitleButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  basicTitle: {
    color: getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND),
  },
  disabledTitleColor: {
    color: getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND),
  },
};

const themed = {
  light: {
    basicTitle: {
      color: getColor(COLOR_KEYS.PRIMARY_BUTTON),
    },
  },

  dark: {},

  celsius: {},
};

const CelButtonStyle = () => getThemedStyle(base, themed);

export default CelButtonStyle;
