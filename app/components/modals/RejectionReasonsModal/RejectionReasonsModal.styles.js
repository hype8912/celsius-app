import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    marginRight: 25,
    marginLeft: 25,
  },
  bullet: {
    textAlign: "center",
    flex: 0.05,
  },
  text: {
    flex: 0.95,
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

const RejectionReasonsModalStyle = () => getThemedStyle(base, themed);

export default RejectionReasonsModalStyle;
