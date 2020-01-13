import STYLES from "../../../constants/STYLES";
import { getThemedStyle } from "../../../utils/styles-util";

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
    backgroundColor: STYLES.COLORS.GREEN,
  },
  nonColor: {
    backgroundColor: STYLES.COLORS.GREEN_OPACITY,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const HeadingProgressBarStyle = () => getThemedStyle(base, themed);

export default HeadingProgressBarStyle;
