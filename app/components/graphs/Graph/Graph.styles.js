import { getThemedStyle, heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

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
    width: widthPercentageToDP("21.33%"),
    height: heightPercentageToDP("6.2%"),
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
  }
};

const themed = {
    light: {
      cursorBackgroundColor: {
        backgroundColor: "white",
      },
      labelBoxBackgroundColor: {
        backgroundColor: STYLES.COLORS.DARK_GRAY,
      },
      triangleBackgroundColor: {
        borderBottomColor: STYLES.COLORS.DARK_GRAY,
      }
    },

    dark: {
      cursorBackgroundColor: {
        backgroundColor: STYLES.COLORS.DARK_BACKGROUND,
      },
      labelBoxBackgroundColor: {
        backgroundColor: STYLES.COLORS.DARK_LABEL,
      },
      triangleBackgroundColor: {
        borderBottomColor: STYLES.COLORS.DARK_LABEL,
      }
    },

    celsius: {
      cursorBackgroundColor: {
        backgroundColor: "white",
      },
      labelBoxBackgroundColor: {
        backgroundColor: STYLES.COLORS.DARK_GRAY,
      },
      triangleBackgroundColor: {
        borderBottomColor: STYLES.COLORS.DARK_GRAY,
      }
    }
}

const GraphStyle = () => getThemedStyle(base, themed);

export default GraphStyle
