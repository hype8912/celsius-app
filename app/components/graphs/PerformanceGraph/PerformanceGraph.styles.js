import { Dimensions } from "react-native";
import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const height = heightPercentageToDP("25%");
const { width } = Dimensions.get("window");

const base = {
  root: {
    flex: 1,
    paddingTop: heightPercentageToDP("20%"),
  },
  container: {
    height,
    width,
  },
  pointer: {
    position: "absolute",
    bottom: heightPercentageToDP("25%"),
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    borderRadius: 8,
    width: widthPercentageToDP("25.73%"),
    height: heightPercentageToDP("5.2%"),
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    fontFamily: "Barlow-Regular",
    color: "white",
    height: heightPercentageToDP("2.7%"),
  },
  scrollPointer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  percentageView: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  singlePercent: {
    flexDirection: "row",
    marginTop: -20,
    alignItems: "flex-start",
  },
};

const themed = {
  light: {
    labelBackground: {
      backgroundColor: STYLES.COLORS.DARK_GRAY,
    },
  },

  dark: {
    labelBackground: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
  },

  celsius: {},
};

const PerformanceGraphStyle = () => getThemedStyle(base, themed);

export default PerformanceGraphStyle;
