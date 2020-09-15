import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  card: {},
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const ConfirmWithdrawalAddressModal = () => getThemedStyle(base, themed);

export default ConfirmWithdrawalAddressModal;
