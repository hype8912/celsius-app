import STYLES from "../../../constants/STYLES";
import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    height: 4,
    flexDirection: "row",
    width: "100%",
  },
  radiusRight: {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  colored: {
    backgroundColor: COLOR_KEYS.POSITIVE_STATE,
  },
  nonColor: {
    backgroundColor: STYLES.COLORS.GREEN_OPACITY, // TODO: missing COLOR_KEY
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const HeadingProgressBarStyle = () => getThemedStyle(base, themed);

export default HeadingProgressBarStyle;
