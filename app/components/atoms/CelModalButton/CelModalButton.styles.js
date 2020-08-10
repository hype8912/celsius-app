import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
    height: 50,
    transform: [
      {
        translateY: 0.5,
      },
    ],
  },
  buttonStyle: {
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  secondaryButtonStyle: {
    color: COLOR_KEYS.TOGGLE_OFF_FOREGROUND,
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON,
  },
  redButtonStyle: {
    color: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
    backgroundColor: COLOR_KEYS.NEGATIVE_STATE,
  },
  disabledButtonStyle: {
    color: COLOR_KEYS.CIRCLE_ICON_FOREGROUND,
    backgroundColor: COLOR_KEYS.TOGGLE_OFF_BACKGROUND,
  },
  greenButtonStyle: {
    color: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
    backgroundColor: COLOR_KEYS.POSITIVE_STATE,
  },
  whiteButtonStyle: {
    color: COLOR_KEYS.PRIMARY_BUTTON,
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
  },
  defaultButtonStyle: {
    color: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const CelModalButtonStyle = () => getThemedStyle(base, themed);

export default CelModalButtonStyle;
