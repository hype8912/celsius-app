import {
  getThemedStyle,
  getScaledFont,
  getColor,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    opacity: 1,
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
    backgroundColor: getColor(COLOR_KEYS.TRANSPARENT),
    borderWidth: 2,
  },
  basicButton: {
    borderColor: getColor(COLOR_KEYS.TRANSPARENT),
    backgroundColor: getColor(COLOR_KEYS.TRANSPARENT),
    height: "auto",
    paddingLeft: 0,
    paddingRight: 0,
  },
  baseTitle: {
    textAlign: "center",
    color: getColor(COLOR_KEYS.NEUTRAL),
  },
  mediumTitle: {
    fontSize: getScaledFont(18),
  },
  smallTitle: {
    fontSize: getScaledFont(14),
  },
  ghostButton: {
    backgroundColor: getColor(COLOR_KEYS.TRANSPARENT),
    borderWidth: 1,
    borderColor: getColor(COLOR_KEYS.PRIMARY),
  },
  ghostredButton: {
    backgroundColor: getColor(COLOR_KEYS.TRANSPARENT),
    borderWidth: 1,
    borderColor: getColor(COLOR_KEYS.NEUTRAL),
  },
  ghostgreenButton: {
    backgroundColor: getColor(COLOR_KEYS.TRANSPARENT),
    borderWidth: 1,
    borderColor: getColor(COLOR_KEYS.NEUTRAL),
  },
  basicredButton: {
    backgroundColor: getColor(COLOR_KEYS.NEUTRAL),
    margin: 20,
  },
  basicgreenButton: {
    backgroundColor: getColor(COLOR_KEYS.NEUTRAL),
  },
  ghostColorTitle: {
    color: getColor(COLOR_KEYS.NEUTRAL),
  },
  ghostTitle: {
    color: getColor(COLOR_KEYS.PRIMARY),
  },
  greenButton: {
    backgroundColor: getColor(COLOR_KEYS.SUCCESS),
  },
  redButton: {
    backgroundColor: getColor(COLOR_KEYS.FAILURE),
  },
  whiteButton: {
    backgroundColor: getColor(COLOR_KEYS.NEUTRAL),
  },
  basicredTitleButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  basicgreenTitleButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
};

const themed = {
  light: {
    container: {
      backgroundColor: getColor(COLOR_KEYS.PRIMARY),
      borderColor: getColor(COLOR_KEYS.PRIMARY),
    },
    basicTitle: {
      color: getColor(COLOR_KEYS.PRIMARY),
    },
    disabledTitleColor: {
      color: getColor(COLOR_KEYS.PRIMARY),
    },
  },

  dark: {
    container: {
      backgroundColor: getColor(COLOR_KEYS.PRIMARY),
      borderColor: getColor(COLOR_KEYS.PRIMARY),
    },
    basicTitle: {
      color: getColor(COLOR_KEYS.PRIMARY),
    },
    disabledTitleColor: {
      color: getColor(COLOR_KEYS.PRIMARY),
    },
  },

  celsius: {},
};

const CelButtonStyle = () => getThemedStyle(base, themed);

export default CelButtonStyle;
