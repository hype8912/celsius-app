import { Dimensions, Platform } from "react-native";
import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON,
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: Platform.OS === "android" ? 10 : 0,
  },
  background: {
    opacity: 0.95,
    backgroundColor: COLOR_KEYS.BACKGROUND,
  },
  animatedBackground: {
    position: "absolute",
    backgroundColor: COLOR_KEYS.TRANSPARENT,
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
  shadowStyle: {
    shadowColor: COLOR_KEYS.FAB_BUTTON_SHADOW,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const FabMenuAnimatedStyle = () => getThemedStyle(base, themed);

export default FabMenuAnimatedStyle;
