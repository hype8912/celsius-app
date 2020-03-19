// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../../utils/styles-util";

const base = {
  container: { paddingHorizontal: 20, marginTop: 20 },
  content: { flexDirection: "row", justifyContent: "space-between" },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const CardSectionStyle = () => getThemedStyle(base, themed);

export default CardSectionStyle;
