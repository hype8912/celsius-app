import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 25,
  },
  wrapper: {},
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const CelPayChooseFriendStyle = () => getThemedStyle(base, themed);

export default CelPayChooseFriendStyle;
