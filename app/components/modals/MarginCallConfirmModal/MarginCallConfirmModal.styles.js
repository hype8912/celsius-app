// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
  card: {
    color: COLOR_KEYS.BACKGROUND,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const MarginCallConfirmModalStyle = () => getThemedStyle(base, themed);

export default MarginCallConfirmModalStyle;
