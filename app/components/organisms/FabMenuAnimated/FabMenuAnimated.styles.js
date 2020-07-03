import { Dimensions, Platform } from "react-native";
import STYLES from "../../../constants/STYLES";
import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const { width, height } = Dimensions.get("window");

const base = {
  fabButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
  },
  realFabButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    elevation: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  helpCard: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  helpCardWrapper: {
    position: "absolute",
    left: widthPercentageToDP("30%"),
  },
  opacityCircle: {
    backgroundColor: STYLES.COLORS.CELSIUS,
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: Platform.OS === "android" ? 10 : 0,
  },
  background: {
    opacity: 0.95,
    backgroundColor: "red",
  },
  animatedBackground: {
    position: "absolute",
    backgroundColor: "transparent",
    width,
    height,
  },
  item: {
    position: "absolute",
  },
  itemRow: {
    width: 60,
    height: 60,
  },
  text: {
    marginTop: 10,
  },
};

const themed = {
  light: {
    background: {
      opacity: 0.97,
      backgroundColor: "white",
    },
    shadowStyle: {
      shadowColor: STYLES.COLORS.FAB_BUTTON_LIGHT_MODE_SHADOW,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.8,
      shadowRadius: 3,
    },
  },
  dark: {
    background: {
      opacity: 0.99,
      backgroundColor: "rgb(21, 30, 39)",
    },
    shadowStyle: {
      shadowColor: STYLES.COLORS.FAB_BUTTON_DARK_MODE_SHADOW,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.6,
      shadowRadius: 3,
    },
  },

  unicorn: {},
};

const FabMenuAnimatedStyle = () => getThemedStyle(base, themed);

export default FabMenuAnimatedStyle;
