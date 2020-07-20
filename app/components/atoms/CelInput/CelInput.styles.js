import { Platform, StyleSheet } from "react-native";
import {
  getPadding,
  getThemedStyle,
  getFontFamily,
  getFontSize,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    borderRadius: 8,
  },
  fullScreen: {
    width: "100%",
  },
  trans: {
    backgroundColor: "transparent",
  },
  inputWrapper: {
    ...StyleSheet.flatten(getPadding("0 16 0 16")),
    height: 50,
    borderRadius: 8,
    backgroundColor: COLOR_KEYS.CARDS,
    ...Platform.select({
      android: {
        ...STYLES.ANDROID_BORDER_STYLES,
        borderColor: "transparent",
      },
      ios: {
        ...STYLES.SHADOW_STYLES,
      },
    }),
  },
  input: {
    height: 50,
    fontFamily: getFontFamily("light"),
    color: COLOR_KEYS.HEADLINE,
  },
  disabledInput: {
    opacity: 0.6,
  },
  activeInput: {
    borderWidth: 1,
    borderColor: COLOR_KEYS.HEADLINE,
    shadowOpacity: 0,
  },
  borderView: {
    borderColor: "#E9E9E9",
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 2,
  },
  rightText: {
    position: "absolute",
    right: 10,
    top: 12,
    height: 23,
    color: COLOR_KEYS.PARAGRAPH,
  },
  textPlaceholderColor: {
    color: COLOR_KEYS.PARAGRAPH,
  },
};

const themed = {
  light: {
    input: {
      fontFamily: getFontFamily("light", "Barlow"),
      fontSize: getFontSize("H4"),
    },
  },

  dark: {
    input: {
      fontFamily: getFontFamily("light", "Barlow"),
      fontSize: getFontSize("H4"),
    },
  },

  unicorn: {
    input: {
      fontFamily: getFontFamily("light", "Pangram"),
      fontSize: getFontSize("H4"),
    },
  },
};

const CelInputStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default CelInputStyle;
