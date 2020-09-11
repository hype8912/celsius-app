import { COLOR_KEYS } from "./COLORS";
import { getColor } from "../utils/styles-util";

const COLORS = {
  TRANSPARENT: "rgba(0,0,0,0)",
  WHITE: "#fff",
  WHITE_OPACITY7: "rgba(255,255,255,0.7)",
  WHITE_OPACITY5: "rgba(255,255,255,0.5)",
  WHITE_OPACITY3: "rgba(255,255,255,0.3)",
  WHITE_OPACITY2: "rgba(255,255,255,0.2)",
  WHITE_OPACITY1: "rgba(255,255,255,0.1)",
  BLACK_OPACITY2: "rgba(0,0,0,0.2)",
  CELSIUS: "#3F51AB", // prov: change name!
  DARK_HEADER: "rgba(31,46,61,0.09)",
  DARK_BACKGROUND: "#151e27",
  DARK_LABEL: "#293d51",
  DARK_OVERLAY: "rgba(21, 30, 39, 0.9)",
  DARKEST_HEADER: "#344352",
  DARK_MODAL_OUTSIDE_BACKGROUND_COLOR: "rgba(21, 30, 39, 0.80)",
  LIGHT_MODAL_OUTSIDE_BACKGROUND_COLOR: "rgb(29, 37, 44)",
  LIGHT_MODAL_ANDROID__OUTSIDE_BACKGROUND_COLOR: "rgba(21, 29, 37, 0.92)",
  DARK_MODAL_ANDROID_OUTSIDE_BACKGROUND_COLOR: "rgba(21, 30, 39, 0.95)",
  DARK_FAB_OUTSIDE_BACKGROUND_COLOR: "rgba(21, 30, 39, 0.80)",
  FAB_BUTTON_LIGHT_MODE_SHADOW: "rgba(20,32,80,0.4)",
  FAB_BUTTON_DARK_MODE_SHADOW: "rgba(0,0,0,0.2)",

  // style guide colors
  LIGHT_GRAY: "#f3f3f3",
  MEDIUM_GRAY: "#737a82",
  MEDIUM_GRAY1: "rgba(115,122,130,0.1)",
  MEDIUM_GRAY3: "rgba(115,122,130,0.3)",
  MEDIUM_GRAY5: "rgba(115,122,130,0.5)",
  GRAY: "#bbbfc2",
  SEMI_GRAY: "#344352",
  DARK_GRAY: "#3d4853",
  BLUE_GRAY: "#293D51",
  DARK_GRAY1: "rgba(61, 72, 83, 0.1)",
  DARK_GRAY2: "rgba(61, 72, 83, 0.2)",
  DARK_GRAY3: "rgba(61,72,83,0.3)",
  DARK_GRAY5: "rgba(61, 72, 83, 0.5)",
  DARK_GRAY6: "rgba(61,72,83,0.6)",
  DARK_GRAY7: "rgba(61, 72, 83, 0.7)",
  DARK_GRAY_OPACITY: "rgba(61, 72, 83, 0.15)",
  DARK_TOGGLE_FOREGROUND: "#79828B",
  DARK_TOGGLE_BACKGROUND: "#404D59",
  DARK_BUTTON_GRAY: "#344250",
  DARK_SECONDARY_BUTTON_GRAY: "#4B5763",
  CELSIUS_BLUE: "#4156A6",
  CELSIUS_BLUE_OPACITY1: "rgba(65, 86, 166, 0.1)",
  CELSIUS_BLUE_OPACITY5: "rgba(65, 86, 166, 0.5)",
  MODAL_BASIC_BUTTON: "rgba(65,86,166)",
  DISABLED_BASIC_BUTTON25: "rgba(65,86,166,0.25)",
  DISABLED_BASIC_BUTTON01: "rgba(65,86,166,0.01)",
  GREEN: "#4fb895",
  GREEN_OPACITY: "rgba(79,184,149,0.15)",
  ORANGE: "#e19f30",
  ORANGE_DARK: "#E87325",
  RED: "rgb(239,70,26)",
  RED_OPACITY2: "rgba(239,70,26, 0.2)",
};

const CAMERA_MASK_SIZES = {
  circle: {
    width: 250,
    height: 250,
  },
  utility: {
    width: 286,
    height: 341,
  },
};

const SHADOW_STYLES = {
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.03,
  shadowRadius: 3,
};

const ANDROID_SHADOW_STYLES = {
  shadowOffset: { width: 0, height: 3 },
  borderColor: "#E9E9E9",
  borderRadius: 30,
  borderTopWidth: 0.2,
  borderLeftWidth: 0.2,
  borderRightWidth: 0.5,
  borderBottomWidth: 4,
};

const ANDROID_BORDER_STYLES = {
  borderColor: getColor(COLOR_KEYS.BORDER_SHADOW_COLOR),
  borderTopWidth: 0.2,
  borderLeftWidth: 0.2,
  borderRightWidth: 0.5,
  borderBottomWidth: 2,
};

const FONTSIZE = {
  H0: 44,
  H1: 40,
  H2: 26,
  H3: 21,
  H4: 18,
  H5: 16,
  H6: 14,
  H7: 12,
  H8: 10,
};

export default {
  COLORS,
  FONTSIZE,
  CAMERA_MASK_SIZES,
  SHADOW_STYLES,
  ANDROID_SHADOW_STYLES,
  ANDROID_BORDER_STYLES,
};
