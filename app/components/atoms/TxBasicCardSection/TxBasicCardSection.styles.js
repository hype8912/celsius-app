// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: { width: "100%", paddingHorizontal: 20 },
  percentage: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  amount: { flexDirection: "row", justifyContent: "space-around" },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const BasicCardSectionStyle = () => getThemedStyle(base, themed);

export default BasicCardSectionStyle;
