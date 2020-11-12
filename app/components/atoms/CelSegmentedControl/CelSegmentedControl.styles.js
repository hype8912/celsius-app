import { COLOR_KEYS } from "../../../constants/COLORS";
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flexDirection: "row",
    backgroundColor: COLOR_KEYS.WHITE,
    shadowColor: "black",
    shadowOffset: {
      width: -1,
      height: 1,
    },
    shadowOpacity: 0.11,
    shadowRadius: 1.0,
    elevation: 1,
  },
  thumb: {
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON,
    height: 42,
    borderRadius: 21,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    shadowColor: "black",
    shadowOffset: {
      width: -1,
      height: 1,
    },
    shadowOpacity: 0.11,
    shadowRadius: 1.0,
    elevation: 1,
  },
  image: {
    width: 17,
    height: 17,
    marginRight: 5,
    resizeMode: "contain",
  },
  optionView: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const CelSegmentedControlStyle = () => getThemedStyle(base, themed);

export default CelSegmentedControlStyle;
