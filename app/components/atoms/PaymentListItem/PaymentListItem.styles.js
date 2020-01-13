// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1,
  },
  baseWrapper: {
    borderRadius: 8,
  },
  greenWrapper: {
    backgroundColor: STYLES.COLORS.GREEN,
  },
  textWrapper: {
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  upperTextWrapper: {
    flex: 1,
    top: 10,
    zIndex: 1,
    borderRadius: 4,
    alignSelf: "center",
    justifyContent: "center",
    width: 160,
    height: 25,
  },
};

const themed = {
  light: {
    highlightWrapper: {
      backgroundColor: STYLES.COLORS.LIGHT_GRAY,
    },
    upperTextWrapper: {
      backgroundColor: STYLES.COLORS.LIGHT_GRAY,
    },
    upperText: {
      color: STYLES.COLORS.MEDIUM_GRAY,
    },
  },

  dark: {
    highlightWrapper: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    upperTextWrapper: {
      backgroundColor: STYLES.COLORS.SEMI_GRAY,
    },
    upperText: {
      color: STYLES.COLORS.WHITE,
    },
  },

  celsius: {},
};

const PaymentListItemStyle = () => getThemedStyle(base, themed);

export default PaymentListItemStyle;
