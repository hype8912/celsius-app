import { Platform } from "react-native";
import { getColor, getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

const base = {
  container: {
    borderRadius: 30,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: 60,
    height: 60,
  },
  view: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    shadowColor: STYLES.COLORS.DARK_GRAY,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    zIndex: -1,
  },
  text: {
    marginTop: 10,
  },
};

const themed = {
  light: {
    container: {
      ...Platform.select({
        android: {
          ...STYLES.ANDROID_SHADOW_STYLES,
        },
        ios: {
          ...STYLES.SHADOW_STYLES,
        },
      }),
    },
    viewmenu: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    textmenu: {
      color: STYLES.COLORS.DARK_GRAY,
    },
    viewcoin: { backgroundColor: getColor(COLOR_KEYS.HEADER, THEMES.LIGHT) },
    textcoin: { color: getColor(COLOR_KEYS.HEADLINE, THEMES.LIGHT) },
    fillColor: { color: getColor(COLOR_KEYS.HEADLINE, THEMES.LIGHT) },
  },

  dark: {
    container: {
      ...Platform.select({
        android: {
          ...STYLES.ANDROID_SHADOW_STYLES,
          borderColor: "transparent",
        },
        ios: {
          ...STYLES.SHADOW_STYLES,
        },
      }),
    },
    viewmenu: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    textmenu: {
      color: STYLES.COLORS.WHITE,
    },
    viewcoin: { backgroundColor: getColor(COLOR_KEYS.HEADER, THEMES.DARK) },
    textcoin: { color: getColor(COLOR_KEYS.HEADLINE, THEMES.DARK) },
    fillColor: { color: getColor(COLOR_KEYS.HEADLINE, THEMES.DARK) },
  },

  unicorn: {
    viewmenu: {
      backgroundColor: STYLES.COLORS.CELSIUS,
    },
    textmenu: {
      color: STYLES.COLORS.WHITE,
    },
    viewcoin: { backgroundColor: getColor(COLOR_KEYS.HEADER, THEMES.UNICORN) },
    textcoin: { color: getColor(COLOR_KEYS.HEADLINE, THEMES.UNICORN) },
    fillColor: { color: getColor(COLOR_KEYS.HEADLINE, THEMES.UNICORN) },
  },
};

const CircleButtonStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default CircleButtonStyle;
