// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1,
  },
  wrapper: {
    backgroundColor: "white",
    marginVertical: 10,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  active: { margin: 10 },
  installmentsWrapper: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
    backgroundColor: STYLES.COLORS.LIGHT_GRAY,
  },
  period: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  styleWrapper: {
    justifyContent: "flex-end",
    marginTop: 10,
    height: 50,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const InterestPaymentOverviewScreenStyle = () => getThemedStyle(base, themed);

export default InterestPaymentOverviewScreenStyle;
