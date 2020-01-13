import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

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
    backgroundColor: "white",
    flex: 1,
  },
  taxID: {
    borderRadius: 10,
    backgroundColor: "white",
    flex: 1,
    height: 50,
    justifyContent: "space-around",
    paddingLeft: 10,
    marginVertical: 20,
  },
  nationalID: {
    borderRadius: 10,
    backgroundColor: "white",
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
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    nationalID: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    inputCel: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
  },

  celsius: {},
};

const SocialSecurityNumberStyle = () => getThemedStyle(base, themed);

export default SocialSecurityNumberStyle;
