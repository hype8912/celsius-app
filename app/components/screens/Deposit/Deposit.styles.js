import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10,
  },

  copyShareWrapper: {
    width: "100%",
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
  rateInfoCard: {
    marginHorizontal: 20,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const DepositStyle = () => getThemedStyle(base, themed);

export default DepositStyle;
