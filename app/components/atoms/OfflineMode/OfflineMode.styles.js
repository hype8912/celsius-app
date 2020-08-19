import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: STYLES.COLORS.WHITE,
  },
  icon: {
    width: 34,
    resizeMode: "contain",
    marginTop: 0,
    marginLeft: 32,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const EmptyStateStyle = () => getThemedStyle(base, themed);

export default EmptyStateStyle;
