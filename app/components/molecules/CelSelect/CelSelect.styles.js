import { StyleSheet, Platform } from "react-native";

import STYLES from "../../../constants/STYLES";
import {
  getPadding,
  getThemedStyle,
  getColor,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

const base = {
  container: {
    height: 50,
    ...StyleSheet.flatten(getPadding("10 16 13 16")),
    borderRadius: 8,
    ...Platform.select({
      android: {
        borderColor: "#E9E9E9",
        borderTopWidth: 0.2,
        borderLeftWidth: 0.2,
        borderRightWidth: 0.5,
        borderBottomWidth: 2,
      },
      ios: {
        ...STYLES.SHADOW_STYLES,
      },
    }),
  },
  disabledInput: {
    opacity: 0.6,
  },
  flagImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
};

const themed = {
  light: {
    container: {
      backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.LIGHT),
    },
    iconColor: {
      color: getColor(COLOR_KEYS.HEADLINE, THEMES.LIGHT),
    },
    textColor: {
      color: getColor(COLOR_KEYS.HEADLINE, THEMES.LIGHT),
    },
  },

  dark: {
    container: {
      backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.DARK),
      ...Platform.select({
        android: {
          borderColor: "transparent",
        },
      }),
    },
    iconColor: {
      color: getColor(COLOR_KEYS.HEADLINE, THEMES.DARK),
    },
    textColor: {
      color: getColor(COLOR_KEYS.HEADLINE, THEMES.DARK),
    },
  },

  unicorn: {
    container: {
      backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.UNICORN),
    },
    iconColor: {
      color: getColor(COLOR_KEYS.HEADLINE, THEMES.UNICORN),
    },
    textColor: {
      color: getColor(COLOR_KEYS.HEADLINE, THEMES.UNICORN),
    },
  },
};

const CelSelectStyle = () => getThemedStyle(base, themed);

export default CelSelectStyle;
