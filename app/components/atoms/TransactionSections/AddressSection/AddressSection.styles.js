// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../../utils/styles-util";

const base = {
  container: { paddingHorizontal: 20 },
  content: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
  },
  button: { flexDirection: "row", alignItems: "flex-start" },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const AddressSectionStyle = () => getThemedStyle(base, themed);

export default AddressSectionStyle;
