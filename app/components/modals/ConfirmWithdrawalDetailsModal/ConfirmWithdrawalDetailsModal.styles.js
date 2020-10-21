// import STYLES from '../../../constants/STYLES';
import { getThemedStyle, widthPercentageToDP } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  address: {
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingTop: 10,
  },
  amountWrapper: { alignItems: "center" },
  buttonsWrapper: {
    justifyContent: "flex-end",
    height: 50,
    width: widthPercentageToDP("90%"),
    position: "absolute",
    bottom: 0,
  },
  lineHeight: {
    lineHeight: 23,
  },
  separator: { marginHorizontal: 20 },
  margin: {marginTop: 5}
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const ConfirmWithdrawalDetailsModalStyle = () => getThemedStyle(base, themed);

export default ConfirmWithdrawalDetailsModalStyle;
