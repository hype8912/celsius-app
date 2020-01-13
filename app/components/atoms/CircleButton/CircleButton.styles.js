import { Platform } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

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
    viewcoin: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    textcoin: {
      color: STYLES.COLORS.DARK_GRAY,
    },
    fillColor: {
      color: STYLES.COLORS.DARK_GRAY,
    },
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
    viewcoin: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    textcoin: {
      color: STYLES.COLORS.WHITE,
    },
    fillColor: {
      color: STYLES.COLORS.WHITE_OPACITY5,
    },
  },

  celsius: {
    viewmenu: {
      backgroundColor: STYLES.COLORS.CELSIUS,
    },
    textmenu: {
      color: STYLES.COLORS.WHITE,
    },
    viewcoin: {
      backgroundColor: STYLES.COLORS.CELSIUS,
    },
    textcoin: {
      color: STYLES.COLORS.WHITE,
    },
    fillColor: {
      color: STYLES.COLORS.WHITE,
    },
  },
};

const CircleButtonStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default CircleButtonStyle;
