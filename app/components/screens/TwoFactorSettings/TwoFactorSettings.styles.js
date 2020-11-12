import { getThemedStyle, widthPercentageToDP } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  qrWrapper: {
    marginTop: 15,
    marginBottom: 10,
    padding: 10,
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
    borderRadius: 6,
  },
  separatorWrapper: {
    paddingVertical: 15,
    width: "100%",
  },
  secretText: {
    color: COLOR_KEYS.BANNER_INFO,
    marginTop: 15,
    maxWidth: "70%",
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },

  buttonsContainer: {
    flexDirection: "row",
    height: 74,
    justifyContent: "space-between"
  },

  buttonCard: {
    backgroundColor: "#FFF",
    width: widthPercentageToDP("43%"),
  },

  qrCodeBlur: {
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 6
  },

  imageBlur: {
    flex: 1
  },

  buttonIconHand: {
    alignSelf:"center",
    width: 22,
    height: 20
  },

  buttonIconCopy: {
    alignSelf:"center",
    width: 16,
    height: 20
  },

  warningContainer: {
    flexDirection: "row"
  },

  warningText: {
    flexDirection: "column"
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const TwoFactorSettingsStyle = () => getThemedStyle(base, themed);

export default TwoFactorSettingsStyle;
