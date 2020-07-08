// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  buttonsWrapper: {
    justifyContent: "flex-end",
    marginTop: 20,
    height: 50,
  },
  installmentsWrapper: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const InterestReminderModalStyle = () => getThemedStyle(base, themed);

export default InterestReminderModalStyle;
