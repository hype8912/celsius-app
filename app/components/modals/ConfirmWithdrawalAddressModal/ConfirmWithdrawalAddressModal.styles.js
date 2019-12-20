// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  card: {
    backgroundColor: STYLES.COLORS.LIGHT_GRAY,
  },
};

const themed = {
  light: {},

  dark: {
    card: {
      backgroundColor: STYLES.COLORS.BLUE_GRAY,
    },
  },

  celsius: {},
};

const ConfirmWithdrawalAddressModal = () => getThemedStyle(base, themed);

export default ConfirmWithdrawalAddressModal;
