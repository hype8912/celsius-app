import { Platform, StyleSheet } from "react-native";
import {
  getPadding,
  getThemedStyle,
  getScaledFont,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const fontSize = getScaledFont(STYLES.FONTSIZE.H4);
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
    backgroundColor: STYLES.COLORS.WHITE,
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
    fontSize,
    fontFamily: "Barlow-Light",
  },
  disabledInput: {
    opacity: 0.6,
  },
  activeInput: {
    borderWidth: 1,
    borderColor: STYLES.COLORS.DARK_GRAY_OPACITY,
    shadowOpacity: 0,
  },
  borderView: {
    // borderWidth: 1,
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
    color: STYLES.COLORS.MEDIUM_GRAY,
  },
};

const themed = {
  light: {
    inputWrapper: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    input: {
      color: STYLES.COLORS.DARK_GRAY,
    },
    textPlaceholderColor: {
      color: STYLES.COLORS.MEDIUM_GRAY5,
    },
  },

  dark: {
    inputWrapper: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    input: {
      color: STYLES.COLORS.WHITE,
    },
    textPlaceholderColor: {
      color: STYLES.COLORS.WHITE_OPACITY3,
    },
  },

  celsius: {
    inputWrapper: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    input: {
      color: STYLES.COLORS.DARK_GRAY,
    },
    textPlaceholderColor: {
      color: STYLES.COLORS.MEDIUM_GRAY5,
    },
  },
};

const CelInputStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default CelInputStyle;
