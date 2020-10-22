// import STYLES from '../../../constants/STYLES';
import { getColor, getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
    borderColor: getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND),
  },

  monthly: {
    width: "45%",
    paddingHorizontal: 5,
  },
  textOpacity: {
    opacity: 0.6,
  },
}

const themed = {
    light: {},

    dark: {},

    unicorn: {}
}

const ConfirmExtendLoanStyle = () => getThemedStyle(base, themed);

export default ConfirmExtendLoanStyle
