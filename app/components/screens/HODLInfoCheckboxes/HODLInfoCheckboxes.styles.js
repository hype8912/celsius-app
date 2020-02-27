// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const HODLInfoCheckboxesStyle = () => getThemedStyle(base, themed);

export default HODLInfoCheckboxesStyle;
