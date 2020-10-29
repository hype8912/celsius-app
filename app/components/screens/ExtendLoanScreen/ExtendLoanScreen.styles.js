// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  textInput: {textAlign: "center"},
  wrapper: { justifyContent: "space-around", alignItems: "center" },
  circleWrapper: {marginVertical: 30, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  input: {alignItems: "center"},
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const ExtendLoanScreenStyle = () => getThemedStyle(base, themed);

export default ExtendLoanScreenStyle;
