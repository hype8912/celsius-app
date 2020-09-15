import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  buttonWrapper: {
    height: 50,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const ReferralReceivedModalStyle = () => getThemedStyle(base, themed);

export default ReferralReceivedModalStyle;
