// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  wrapper: {
    height: 450,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  buttonsWrapper: {
    justifyContent: "flex-end",
    marginTop: 10,
    height: 30,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const ReCaptchaModalStyle = () => getThemedStyle(base, themed);

export default ReCaptchaModalStyle;
