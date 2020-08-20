import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  ssnInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 30,
    marginHorizontal: 20,
  },
  inputCel: {
    borderRadius: 10,
    backgroundColor: COLOR_KEYS.WHITE,
    flex: 1,
  },
  taxID: {
    borderRadius: 10,
    backgroundColor: COLOR_KEYS.WHITE,
    flex: 1,
    height: 50,
    justifyContent: "space-around",
    paddingLeft: 10,
    marginVertical: 20,
  },
  nationalID: {
    borderRadius: 10,
    backgroundColor: COLOR_KEYS.WHITE,
    flex: 1,
    height: 50,
    justifyContent: "space-around",
    paddingLeft: 10,
    marginBottom: 20,
  },
};

const themed = {
  light: {
    nationalID: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
  },
  dark: {
    taxID: {
      backgroundColor: STYLES.COLORS.DARK_HEADER, // TODO: missing COLOR_KEYS
    },
    nationalID: {
      backgroundColor: STYLES.COLORS.DARK_HEADER, // TODO: missing COLOR_KEYS
    },
    inputCel: {
      backgroundColor: STYLES.COLORS.DARK_HEADER, // TODO: missing COLOR_KEYS
    },
  },

  unicorn: {},
};

const SocialSecurityNumberStyle = () => getThemedStyle(base, themed);

export default SocialSecurityNumberStyle;
