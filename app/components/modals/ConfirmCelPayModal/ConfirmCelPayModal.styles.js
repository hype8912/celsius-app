// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  amount: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  buttonsWrapper: {
    justifyContent: "flex-end",
    marginTop: 20,
    height: 50,
  },
  sentTo: {
    paddingHorizontal: 20,
    marginTop: 20
  },
  dollarColor: {opacity: 0.5},

};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const ConfirmCelPayModalStyle = () => getThemedStyle(base, themed);

export default ConfirmCelPayModalStyle;
