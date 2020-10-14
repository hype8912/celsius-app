// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  address: {
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingVertical: 15,
  },
  amountWrapper: {
    paddingVertical: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonsWrapper: {
    justifyContent: "flex-end",
    marginTop: 20,
    height: 50,
  },
  lineHeight: {
    lineHeight: 23,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const ConfirmWithdrawalDetailsModalStyle = () => getThemedStyle(base, themed);

export default ConfirmWithdrawalDetailsModalStyle;
