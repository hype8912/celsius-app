import { Platform } from "react-native";
import STYLES from "../../../constants/STYLES";
import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: 8,
    marginVertical: 20,
    minHeight: 50,
    backgroundColor: COLOR_KEYS.CARDS,
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
  textColor: { color: COLOR_KEYS.PARAGRAPH },
  iconColor: { color: COLOR_KEYS.PARAGRAPH },
};

const themed = {
  light: {},
  dark: {
    container: {
      ...Platform.select({
        android: {
          ...STYLES.ANDROID_BORDER_STYLES,
        },
        ios: {
          ...STYLES.SHADOW_STYLES,
        },
      }),
    },
  },

  unicorn: {},
};

const IconButtonStyle = () => getThemedStyle(base, themed);

export default IconButtonStyle;
