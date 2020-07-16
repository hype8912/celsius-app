// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1,
  },
  buttonsWrapper: {
    height: 50,
  },
  wrapper: {
    marginHorizontal: 20,
  },
  loanToValue: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalDimension: { width: 35, height: 35 },
};

const themed = {
  light: {
    background: {
      backgroundColor: STYLES.COLORS.LIGHT_GRAY,
    },
  },

  dark: {
    background: {
      backgroundColor: STYLES.COLORS.DARK_SECONDARY_BUTTON_GRAY,
    },
  },
  celsius: {},
};

const MarginCallModalStyle = () => getThemedStyle(base, themed);

export default MarginCallModalStyle;
