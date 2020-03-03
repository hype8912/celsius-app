import { Dimensions } from "react-native";
import { getThemedStyle, heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";

const height = heightPercentageToDP("25%");
const {width} = Dimensions.get("window");
const cursorRadius = 10;

const base = {
  root: {
    flex: 1
  },
  container: {
    height,
    width
  },
  cursor: {
    width: cursorRadius * 2,
    height: cursorRadius * 2,
    borderRadius: cursorRadius,
    borderWidth: 1.5,
  },
  circle: {
    width: cursorRadius,
    height: cursorRadius,
    borderRadius: cursorRadius / 2,
    position: "absolute",
    top: "20%",
    left: "20%"
  },
  pointer: {
    position: "absolute",
    bottom: heightPercentageToDP("25%"),
    left: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    borderRadius: 8,
    width: widthPercentageToDP("25.73%"),
    height: heightPercentageToDP("5.2%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(61,72,83,1)",
  },
  labelText: {
    fontFamily: "barlow-regular",
    color: "white",
    height: heightPercentageToDP("2.7%"),
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: widthPercentageToDP("1.5%"),
    borderRightWidth: widthPercentageToDP("1.5%"),
    borderBottomWidth: widthPercentageToDP("1.5%"),
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "rgba(61,72,83,1)",
    transform: [
      { rotate: "180deg" }
    ]
  },
  scrollPointer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  dot: { marginTop: widthPercentageToDP("1.3%"),
    marginRight: 2,
    height: widthPercentageToDP("1.6%"),
    width: widthPercentageToDP("1.6%"),
    borderRadius: widthPercentageToDP("1.6%") / 2
  },
  percentageView : {justifyContent: "space-between", flexDirection: "row"},
  singlePercent: { flexDirection: "row", alignItems: 'flex-start', }
}

const themed = {
    light: {
    },

    dark: {
    },

    celsius: {
    }
}

const PerformanceGraphStyle = () => getThemedStyle(base, themed);

export default PerformanceGraphStyle
