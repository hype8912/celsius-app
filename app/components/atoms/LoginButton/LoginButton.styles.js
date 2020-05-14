import { Platform } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
    height: 50,
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
    borderRadius: 8,
  },
  text: {
    fontSize: STYLES.FONTSIZE.H4,
    fontFamily: "Barlow-Regular",
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
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const LoginButtonStyle = () => getThemedStyle(base, themed);

export default LoginButtonStyle;
