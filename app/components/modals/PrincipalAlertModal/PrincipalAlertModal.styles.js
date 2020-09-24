// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  buttonsWrapper: {
    flexDirection: "row",
    marginTop: 20,
    height: 50,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const PrincipalAlertModalStyle = () => getThemedStyle(base, themed);

export default PrincipalAlertModalStyle;
