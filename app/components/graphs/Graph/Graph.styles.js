import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import { COLOR_KEYS } from "../../../constants/COLORS";

const cursorRadius = heightPercentageToDP("1.06%");

const base = {
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
    left: "20%",
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
    width: widthPercentageToDP("21.33%"),
    height: heightPercentageToDP("4%"),
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLOR_KEYS.CARDS,
    padding: 2,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: COLOR_KEYS.TRANSPARENT,
    borderStyle: "solid",
    borderLeftWidth: widthPercentageToDP("1.5%"),
    borderRightWidth: widthPercentageToDP("1.5%"),
    borderBottomWidth: widthPercentageToDP("1.5%"),
    borderLeftColor: COLOR_KEYS.BACKGROUND,
    borderRightColor: COLOR_KEYS.BACKGROUND,
    borderBottomColor: COLOR_KEYS.CARDS,
    transform: [{ rotate: "180deg" }],
  },
  scrollPointer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  cursorBackgroundColor: {
    backgroundColor: "red",
  },
  labelBoxBackgroundColor: {},
};

const themed = {
  light: {
    labelBoxBackgroundColor: {
      backgroundColor: STYLES.COLORS.DARK_GRAY, // TODO: missing COLOR_KEY
    },
  },

  dark: {
    labelBoxBackgroundColor: {
      backgroundColor: STYLES.COLORS.DARK_LABEL, // TODO: missing COLOR_KEY
    },
  },

  unicorn: {
    labelBoxBackgroundColor: {
      backgroundColor: STYLES.COLORS.DARK_GRAY, // TODO: missing COLOR_KEY
    },
  },
};

const GraphStyle = () => getThemedStyle(base, themed);

export default GraphStyle;
