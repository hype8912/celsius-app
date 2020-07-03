import { Platform } from "react-native";
import STYLES from "../../../constants/STYLES";
import { getColor, getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

const base = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: 8,
    marginVertical: 20,
    minHeight: 50,
  },
  leftWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightTextWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.3,
  },
};

const themed = {
  light: {
    container: { backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.LIGHT) },
    textColor: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.LIGHT) },
    iconColor: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.LIGHT) },
  },

  dark: {
    container: {
      backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.DARK),
      ...Platform.select({
        android: {
          ...STYLES.ANDROID_BORDER_STYLES,
        },
        ios: {
          ...STYLES.SHADOW_STYLES,
        },
      }),
    },
    textColor: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.DARK) },
    iconColor: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.DARK) },
  },

  unicorn: {
    container: {
      backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.UNICORN),
      ...Platform.select({
        android: {
          ...STYLES.ANDROID_SHADOW_STYLES,
          borderColor: "#E9E9E9",
        },
        ios: {
          ...STYLES.SHADOW_STYLES,
        },
      }),
    },
    textColor: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.UNICORN) },
    iconColor: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.UNICORN) },
  },
};

const IconButtonStyle = () => getThemedStyle(base, themed);

export default IconButtonStyle;
