// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1,
  },
  horizontalCardContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  horizontalCardItem: {
    flex: 0.45,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  separatorContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1,
  },
  flagImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: STYLES.COLORS.WHITE,
  },

  monthly: {
    width: "45%",
    paddingHorizontal: 5,
  },
};

const themed = {
  light: {
    grayCard: {
      color: STYLES.COLORS.LIGHT_GRAY,
    },
    blueCard: {
      color: STYLES.COLORS.CELSIUS_BLUE,
    },
    blueCardBoldText: {
      color: STYLES.COLORS.WHITE,
    },
    blueCardText: {
      color: STYLES.COLORS.WHITE_OPACITY5,
    },
  },

  dark: {
    grayCard: {
      color: STYLES.COLORS.SEMI_GRAY,
    },
    blueCard: {
      color: STYLES.COLORS.CELSIUS_BLUE,
    },
    blueCardBoldText: {
      color: STYLES.COLORS.WHITE,
    },
    blueCardText: {
      color: STYLES.COLORS.WHITE_OPACITY5,
    },
  },

  celsius: {},
};

const ConfirmYourLoanStyle = () => getThemedStyle(base, themed);

export default ConfirmYourLoanStyle;
