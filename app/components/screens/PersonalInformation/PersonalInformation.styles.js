// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  ssnInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 20,
  },
  addressInfo: {
    flex: 1,
    flexDirection: "row",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const PersonalInformationStyle = () => getThemedStyle(base, themed);

export default PersonalInformationStyle;
