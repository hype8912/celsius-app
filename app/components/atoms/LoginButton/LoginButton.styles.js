import { Platform } from "react-native";
import {
  getFontSize,
  getThemedStyle,
  getColor,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

const base = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
    height: 50,
    backgroundColor: getColor(COLOR_KEYS.CARDS),
    ...Platform.select({
      android: {
        ...STYLES.ANDROID_BORDER_STYLES,
        borderColor: "transparent",
      },
      ios: {
        ...STYLES.SHADOW_STYLES,
      },
    }),
    borderRadius: 8,
  },
  text: {
    fontSize: getFontSize("H4"),
    justifyContent: "space-between",
    textAlign: "center",
  },
  icon: {
    height: 30,
    aspectRatio: 1,
    marginLeft: 10,
  },
  iconWrapper: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  textColor: {
    color: getColor(COLOR_KEYS.PARAGRAPH),
  },
};

const themed = {
  light: {
    container: { backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.LIGHT) },
    textColor: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.LIGHT) },
  },

  dark: {
    container: { backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.DARK) },
    textColor: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.DARK) },
  },

  unicorn: {
    container: { backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.UNICORN) },
    textColor: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.UNICORN) },
  },
};

const LoginButtonStyle = () => getThemedStyle(base, themed);

export default LoginButtonStyle;
