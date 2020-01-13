// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  wrapper: {
    width: 200,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fakeTwitterButton: {
    display: "none",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const SocialLoginStyle = () => getThemedStyle(base, themed);

export default SocialLoginStyle;
