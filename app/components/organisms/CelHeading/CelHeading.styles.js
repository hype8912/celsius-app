import { StatusBar, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const hasNotch = DeviceInfo.hasNotch();

const base = {
  content: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: Platform.OS === "android" && hasNotch ? 30 : 60,
  },

  center: {
    alignSelf: "center",
    justifyContent: "center",
  },

  left: {
    flex: 1,
    alignItems: "flex-start",
  },

  right: {
    flex: 1,
    alignItems: "flex-end",
    top: Platform.OS === "android" && hasNotch ? -30 : 0,
  },

  headingBackground: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

    ...Platform.select({
      android: {
        borderColor: "#E9E9E9",
        borderBottomWidth: 2,
      },
      ios: {
        ...STYLES.SHADOW_STYLES,
      },
    }),
  },

  transparentBackground: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    position: "absolute",
    backgroundColor: "transparent",
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
  },

  sameBackground: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  profilePicture: {
    width: 36,
    height: 36,
    borderRadius: 18,

    ...Platform.select({
      android: {
        borderColor: "#E9E9E9",
        borderWidth: 1,
      },
      ios: {
        ...STYLES.SHADOW_STYLES,
      },
    }),
  },

  button: {
    borderRadius: 17,
    overflow: "hidden",
    borderColor: "black",
  },
};

const themed = {
  light: {
    headingBackground: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    sameBackground: {
      backgroundColor: STYLES.COLORS.LIGHT_GRAY,
    },
  },

  dark: {
    headingBackground: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
      borderColor: "transparent",
    },
    sameBackground: {
      backgroundColor: STYLES.COLORS.DARK_BACKGROUND,
    },
  },

  celsius: {
    headingBackground: {
      backgroundColor: STYLES.COLORS.CELSIUS,
    },
    sameBackground: {
      backgroundColor: STYLES.COLORS.LIGHT_GRAY,
    },
  },
};

const CelHeadingStyle = () => getThemedStyle(base, themed);

export default CelHeadingStyle;
