import { getColor, getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

const base = {
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  basicCircle: {
    width: 18,
    height: 18,
    borderRadius: 10,
    margin: 10,
  },
};

const themed = {
  light: {
    basicCircle: {
      backgroundColor: getColor(COLOR_KEYS.PRIMARY_BUTTON, THEMES.LIGHT),
    },
    activeCircle: {
      backgroundColor: getColor(COLOR_KEYS.PRIMARY_BUTTON, THEMES.LIGHT),
    },
    lastCircle: {
      backgroundColor: getColor(COLOR_KEYS.POSITIVE_STATE, THEMES.LIGHT),
    },
    errorCircle: {
      backgroundColor: getColor(COLOR_KEYS.NEGATIVE_STATE, THEMES.LIGHT),
    },
  },

  dark: {
    basicCircle: {
      backgroundColor: getColor(COLOR_KEYS.PRIMARY_BUTTON, THEMES.DARK),
    },
    activeCircle: {
      backgroundColor: getColor(COLOR_KEYS.PRIMARY_BUTTON, THEMES.DARK),
    },
    lastCircle: {
      backgroundColor: getColor(COLOR_KEYS.POSITIVE_STATE, THEMES.DARK),
    },
    errorCircle: {
      backgroundColor: getColor(COLOR_KEYS.NEGATIVE_STATE, THEMES.DARK),
    },
  },

  unicorn: {
    basicCircle: {
      backgroundColor: getColor(COLOR_KEYS.PRIMARY_BUTTON, THEMES.UNICORN),
    },
    activeCircle: {
      backgroundColor: getColor(COLOR_KEYS.PRIMARY_BUTTON, THEMES.UNICORN),
    },
    lastCircle: {
      backgroundColor: getColor(COLOR_KEYS.POSITIVE_STATE, THEMES.UNICORN),
    },
    errorCircle: {
      backgroundColor: getColor(COLOR_KEYS.NEGATIVE_STATE, THEMES.UNICORN),
    },
  },
};

const HiddenPinStyle = () => getThemedStyle(base, themed);

export default HiddenPinStyle;
