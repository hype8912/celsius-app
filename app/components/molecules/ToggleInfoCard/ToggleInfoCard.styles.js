import { Platform } from "react-native";
import {
  getThemedStyle,
  heightPercentageToDP,
} from "../../../utils/styles-util";

const radius = Platform.OS === "ios" ? 20 : 24;

const base = {
  container: {
    flex: 1,
  },
  circle: {
    position: "absolute",
    width: heightPercentageToDP(radius),
    height: heightPercentageToDP(radius),
    borderRadius: heightPercentageToDP(radius / 2),
    justifyContent: "center",
    alignItems: "stretch",
    left: -1 * heightPercentageToDP(radius / 2),
    top: -1 * heightPercentageToDP(radius / 4),
  },
  card: {
    overflow: "hidden",
    flexDirection: "row",
    height: heightPercentageToDP(radius / 2),
  },
  toggleWrapper: {
    flexDirection: "column",
    width: heightPercentageToDP("14%"),
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 14,
  },
  text: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    margin: 12,
  },

  infoSubtitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const ToggleInfoCardStyle = () => getThemedStyle(base, themed);

export default ToggleInfoCardStyle;
