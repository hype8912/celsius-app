import { Platform } from "react-native";
import {
  getThemedStyle,
  heightPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
    backgroundColor: COLOR_KEYS.HEADER,
    ...Platform.select({
      android: {
        borderColor: COLOR_KEYS.TRANSPARENT,
        borderBottomWidth: 2,
      },
      ios: {
        ...STYLES.SHADOW_STYLES,
      },
    }),
  },

  transparentBackground: {
    position: "absolute",
    backgroundColor: COLOR_KEYS.TRANSPARENT,
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
        borderColor: COLOR_KEYS.TOGGLE_OFF_BACKGROUND,
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
    borderColor: COLOR_KEYS.BLACK,
  },
  sameBackground: {
    backgroundColor: COLOR_KEYS.BACKGROUND,
  },
};

const themed = {
  light: {},
  dark: {
    headingBackground: {
      borderColor: COLOR_KEYS.TRANSPARENT,
    },
  },
  unicorn: {
    headingBackground: {
      borderColor: null, // TODO: handle this better way when remove light theme
      ...Platform.select({
        android: {
          borderColor: COLOR_KEYS.TRANSPARENT,
          borderBottomWidth: 0,
        },
        ios: {
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0,
          shadowRadius: 0,
        },
      }),
    },
  },
};

const CelHeadingStyle = () => getThemedStyle(base, themed);

export default CelHeadingStyle;
