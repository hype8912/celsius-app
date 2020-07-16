// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1,
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  buttonsWrapper: {
    justifyContent: "flex-end",
    marginTop: 20,
    height: 50,
  },
};

const themed = {
  light: {
    card: { color: "#F3F3F3" },
  },

  dark: {
    card: { color: STYLES.COLORS.MEDIUM_GRAY },
  },

  celsius: {},
};

const MarginCallConfirmModalStyle = () => getThemedStyle(base, themed);

export default MarginCallConfirmModalStyle;
