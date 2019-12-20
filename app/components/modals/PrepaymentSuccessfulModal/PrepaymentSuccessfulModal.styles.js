// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonsWrapper: {
    justifyContent: "flex-end",
    marginTop: 20,
    height: 50,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const PrepaymentSuccesfulModalStyle = () => getThemedStyle(base, themed);

export default PrepaymentSuccesfulModalStyle;
