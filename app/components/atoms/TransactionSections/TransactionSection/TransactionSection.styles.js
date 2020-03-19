// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../../utils/styles-util";

const base = {
  container: { paddingHorizontal: 20 },
  content: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
  },
  text: { paddingBottom: 10 },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const TransactionSectionStyle = () => getThemedStyle(base, themed);

export default TransactionSectionStyle;
