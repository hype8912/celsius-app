// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
    marginTop: 10,
  },
  cardWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: { marginLeft: 10, marginTop: 2 },
  tagWrapper: {
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  qrCodeWrapper: {
    backgroundColor: COLOR_KEYS.WHITE,
    padding: 10,
    borderRadius: 4,
  },
  qrCode: {
    alignItems: "center",
  },
  copyShareWrapper: {
    width: "100%",
  },

  copyShareButtonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 15,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const DepositAddressCardStyle = () => getThemedStyle(base, themed);

export default DepositAddressCardStyle;
