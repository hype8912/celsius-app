import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
  },
  emptyAvatarWrapper: {
    borderColor: COLOR_KEYS.TOGGLE_ON_FOREGROUND,
    borderWidth: 4,
  },
  emptyAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const ProfileStyle = () => getThemedStyle(base, themed);

export default ProfileStyle;
