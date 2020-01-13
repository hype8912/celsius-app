import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10,
  },

  copyShareWrapper: {
    width: "100%",
    // marginTop: 15
  },

  copyShareButtonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 15,
  },
  infoBubble: {
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: "2%",
    paddingVertical: "2%",
  },
  qrCodeWrapper: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 4,
  },
  qrCode: {
    alignItems: "center",
  },
};

const themed = {
  light: {
    promotion: {
      marginLeft: 20,
      marginRight: 20,
      backgroundColor: STYLES.COLORS.WHITE,
    },
  },

  dark: {
    promotion: {
      marginLeft: 20,
      marginRight: 20,
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    importantInfo: {
      color: STYLES.COLORS.WHITE,
    },
  },

  celsius: {},
};

const DepositStyle = () => getThemedStyle(base, themed);

export default DepositStyle;
