// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  spinner: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  hodlCodeWrapper: {
    flexDirection: "row",
  },
  codeWrapper: {
    flex: 0.8,
  },
  textWrapper: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const HODLViewCodeStyles = () => getThemedStyle(base, themed);

export default HODLViewCodeStyles;
