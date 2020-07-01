import STYLES from "../../../constants/STYLES";
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  cardWrapper: {
    marginHorizontal: 15,
  },
  inputWrapper: {
    marginLeft: 25,
    marginRight: 25,
  },
  buttonWrapper: {
    height: 50,
    flexDirection: "row",
  },
};

const themed = {
  light: {
    messageTextCard: {
      color: STYLES.COLORS.LIGHT_GRAY,
    },
  },

  dark: {
    messageTextCard: {
      color: STYLES.COLORS.DARK_GRAY2,
    },
  },

  celsius: {},
};

const RegisterPromoCodeModalStyle = () => getThemedStyle(base, themed);

export default RegisterPromoCodeModalStyle;
