// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  buttonsStyle: {
    justifyContent: "flex-end",
    marginTop: 5,
    height: 50,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const NewBlockexplorerCodeStyle = () => getThemedStyle(base, themed);

export default NewBlockexplorerCodeStyle;
