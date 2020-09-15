import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  bottomSegment: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const ProfileStyle = () => getThemedStyle(base, themed);

export default ProfileStyle;
