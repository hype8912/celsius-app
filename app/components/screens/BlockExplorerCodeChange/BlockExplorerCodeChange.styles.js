import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  infoBoxWrapper: {
    flexDirection: "row",
  },
  infoBoxIconWrapper: {
    flex: 0.15,
    paddingRight: 5,
  },
  infoBoxTextWrapper: {
    flex: 0.85,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const BlockExplorerCodeChangeStyle = () => getThemedStyle(base, themed);

export default BlockExplorerCodeChangeStyle;
