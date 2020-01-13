import { StyleSheet, Platform } from "react-native";

import STYLES from "../../../constants/STYLES";
import { getPadding, getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    height: 50,
    ...StyleSheet.flatten(getPadding("10 16 13 16")),
    backgroundColor: STYLES.COLORS.WHITE,
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
      backgroundColor: STYLES.COLORS.WHITE,
    },
    iconColor: {
      color: STYLES.COLORS.DARK_GRAY_OPACITY,
    },
    textColor: {
      color: STYLES.COLORS.DARK_GRAY,
    },
  },

  dark: {
    container: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
      ...Platform.select({
        android: {
          borderColor: "transparent",
        },
      }),
    },
    iconColor: {
      color: STYLES.COLORS.WHITE_OPACITY3,
    },
    textColor: {
      color: STYLES.COLORS.WHITE,
    },
  },

  celsius: {
    container: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    iconColor: {
      color: STYLES.COLORS.DARK_GRAY_OPACITY,
    },
    textColor: {
      color: STYLES.COLORS.DARK_GRAY,
    },
  },
};

const CelSelectStyle = () => getThemedStyle(base, themed);

export default CelSelectStyle;
