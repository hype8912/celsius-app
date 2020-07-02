import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  buttonsWrapper: {
    justifyContent: "flex-end",
    marginTop: 20,
    height: 50,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const CelPayReceivedModalStyle = () => getThemedStyle(base, themed);

export default CelPayReceivedModalStyle;
