// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  addMoreCoinsList: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    width: "100%",
    height: 80,
    borderColor: "gray",
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const LoanPaymentCoinStyle = () => getThemedStyle(base, themed);

export default LoanPaymentCoinStyle;
