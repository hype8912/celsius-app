import { Platform } from "react-native";
// import DeviceInfo from "react-native-device-info";
import {
  getThemedStyle,
  heightPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

// const hasNotch = DeviceInfo.hasNotch();
// const isAndroidWithNotch = Platform.OS === "android" && hasNotch
// const paddingTop = Platform.OS === "android" && !isAndroidWithNotch ? StatusBar.currentHeight : 0
const headerHeight = 60;

const base = {
  container: {
    alignItems: "center",
  },
  content: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: headerHeight,
  },
  center: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
  },
  customCenterComponent: {
    flex: 1,
    alignItems: "center",
    marginTop: heightPercentageToDP("3.5%"),
  },
  left: {
    alignItems: "flex-start",
    justifyContent: "center",
    top: 0,
    minWidth: "15%",
    height: headerHeight,
  },
  lefContentButton: {
    marginTop: 15,
    height: 30,
  },
  right: {
    alignItems: "flex-end",
    justifyContent: "center",
    top: 0,
    minWidth: "15%",
    height: headerHeight,
  },

  headingBackground: {
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
    position: "absolute",
    backgroundColor: "transparent",
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
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
