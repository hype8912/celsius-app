// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: { marginBottom: 10 },
  statusText: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const InfoSectionStyle = () => getThemedStyle(base, themed);

export default InfoSectionStyle;
