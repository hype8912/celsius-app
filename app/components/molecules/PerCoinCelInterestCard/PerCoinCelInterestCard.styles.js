import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1,
  },
  scrollWrapper: {},
};

const themed = {
  light: {
    iconFill: {
      color: STYLES.COLORS.WHITE,
    },
    fillColor: {
      color: STYLES.COLORS.DARK_GRAY,
    },
  },

  dark: {
    iconFill: {
      color: STYLES.COLORS.DARK_HEADER,
    },
    fillColor: {
      color: STYLES.COLORS.WHITE,
    },
  },

  celsius: {},
};

const PerCoinCelInterestCardStyle = () => getThemedStyle(base, themed);

export default PerCoinCelInterestCardStyle;
