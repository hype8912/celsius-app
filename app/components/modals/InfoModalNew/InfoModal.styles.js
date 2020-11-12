import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  buttonWrapper: {
    height: 50,
    flexDirection: "row",
  },
  childrenContainer: { marginHorizontal: 20 },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const InfoModalStyle = () => getThemedStyle(base, themed);

export default InfoModalStyle;
