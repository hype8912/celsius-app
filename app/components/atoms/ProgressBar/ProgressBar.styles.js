import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    height: 4,
    flexDirection: "row",
    width: 127,
  },
  radiusLeft: {
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  radiusRight: {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  colored: {
    backgroundColor: COLOR_KEYS.POSITIVE_STATE,
  },
  nonColor: {
    backgroundColor: COLOR_KEYS.PROGRESS_BAR_OPACITY,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const ProgressBarStyle = () => getThemedStyle(base, themed);

export default ProgressBarStyle;
