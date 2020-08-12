import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  buttonWrapper: {
    height: 50,
    flexDirection: "row",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const InfoModalStyle = () => getThemedStyle(base, themed);

export default InfoModalStyle;
