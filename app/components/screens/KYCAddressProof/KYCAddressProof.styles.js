import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const KYCAddressProofStyle = () => getThemedStyle(base, themed);

export default KYCAddressProofStyle;
