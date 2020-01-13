import STYLES from "../../../constants/STYLES";
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    borderRadius: 15,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
};

const themed = {
  light: {
    container: {
      backgroundColor: STYLES.COLORS.LIGHT_GRAY,
      borderWidth: 0.5,
      borderColor: STYLES.COLORS.MEDIUM_GRAY3,
    },
  },

  dark: {
    container: {
      backgroundColor: STYLES.COLORS.BLUE_GRAY,
      borderWidth: 0.5,
      borderColor: STYLES.COLORS.MEDIUM_GRAY3,
    },
  },

  celsius: {},
};

const RoundedBadgeStyle = () => getThemedStyle(base, themed);

export default RoundedBadgeStyle;
