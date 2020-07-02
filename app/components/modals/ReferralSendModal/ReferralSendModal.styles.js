import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1,
  },
  copyShareWrapper: {
    width: "80%",
    marginTop: 15,
    padding: 10,
    marginHorizontal: "10%",
    marginRight: 25,
    borderWidth: 2,
    borderRadius: 8,
  },

  copyShareButtonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 5,
    marginHorizontal: 25,
  },
  explanation: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: "7%",
    marginRight: "7%",
    alignItems: "stretch",
    alignContent: "stretch",
  },
  shareWrapper: {
    paddingVertical: 20,
  },
};

const themed = {
  light: {
    copyShareWrapper: {
      borderColor: STYLES.COLORS.LIGHT_GRAY,
    },
  },

  dark: {
    copyShareWrapper: {
      borderColor: STYLES.COLORS.WHITE_OPACITY5,
    },
  },

  unicorn: {},
};

const ReferralSendModalStyle = () => getThemedStyle(base, themed);

export default ReferralSendModalStyle;
