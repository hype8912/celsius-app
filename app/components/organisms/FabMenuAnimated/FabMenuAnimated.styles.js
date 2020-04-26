import { Dimensions } from "react-native";
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
  },
  background: {
    opacity: 0.95,
    backgroundColor: "white",
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
  },
  dark: {
    background: {
      opacity: 0.99,
      backgroundColor: "rgb(21, 30, 39)",
    },
  },

  celsius: {},
};

const FabMenuAnimatedStyle = () => getThemedStyle(base, themed);

export default FabMenuAnimatedStyle;
