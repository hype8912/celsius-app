const COLORS = {
  TRANSPARENT: "rgba(0,0,0,0)",
  WHITE: "#fff",
  WHITE_OPACITY7: "rgba(255,255,255,0.7)",
  WHITE_OPACITY5: "rgba(255,255,255,0.5)",
  WHITE_OPACITY3: "rgba(255,255,255,0.3)",
  WHITE_OPACITY2: "rgba(255,255,255,0.2)",
  WHITE_OPACITY1: "rgba(255,255,255,0.1)",
  BLACK_OPACITY2: "rgba(0,0,0,0.2)",
  CELSIUS: "rgba(0,0,0,0)", // prov: change name!
  DARK_HEADER: "#1F2E3D",
  DARK_BACKGROUND: "#100B20",
  DARK_LABEL: "#100B20",
  DARK_OVERLAY: "rgba(16, 11, 32, 0.9)",
  DARKEST_HEADER: "#1F2E3D",
  DARK_MODAL_OUTSIDE_BACKGROUND_COLOR: "rgba(16, 11, 32, 0.8)",
  LIGHT_MODAL_OUTSIDE_BACKGROUND_COLOR: "rgb(16, 11, 32)",
  LIGHT_MODAL_ANDROID__OUTSIDE_BACKGROUND_COLOR: "rgba(16, 11, 32, 0.9)",
  DARK_MODAL_ANDROID_OUTSIDE_BACKGROUND_COLOR: "rgba(16, 11, 32, 0.9)",
  DARK_FAB_OUTSIDE_BACKGROUND_COLOR: "rgba(16, 11, 32, 0.8)",
  FAB_BUTTON_LIGHT_MODE_SHADOW: "rgba(16,11,32,0.4)",
  FAB_BUTTON_DARK_MODE_SHADOW: "rgba(16,11,32,0.2)",

  // style guide colors
  LIGHT_GRAY: "#E9EFF3",
  MEDIUM_GRAY: "#82838E",
  MEDIUM_GRAY1: "rgba(130,131,142,0.1)",
  MEDIUM_GRAY3: "rgba(130,131,142,0.3)",
  MEDIUM_GRAY5: "rgba(130,131,142,0.5)",
  GRAY: "#BBBFC5",
  SEMI_GRAY: "#1F2E3D",
  DARK_GRAY: "#3E3B4C",
  BLUE_GRAY: "#1F2E3D",
  DARK_GRAY1: "rgba(62, 59, 76, 0.1)",
  DARK_GRAY2: "rgba(62, 59, 76, 0.2)",
  DARK_GRAY3: "rgba(62, 59, 76, 0.3)",
  DARK_GRAY5: "rgba(62, 59, 76, 0.5)",
  DARK_GRAY6: "rgba(62, 59, 76, 0.6)",
  DARK_GRAY7: "rgba(62, 59, 76, 0.7)",
  DARK_GRAY_OPACITY: "rgba(62, 59, 76, 0.15)",
  DARK_TOGGLE_FOREGROUND: "#82838E",
  DARK_TOGGLE_BACKGROUND: "#3E3B4C",
  DARK_BUTTON_GRAY: "#3E3B4C",
  DARK_SECONDARY_BUTTON_GRAY: "#3E3B4C",
  CELSIUS_BLUE: "#0c1766",
  CELSIUS_BLUE_OPACITY1: "rgba(12, 23, 102, 0.1)",
  CELSIUS_BLUE_OPACITY5: "rgba(12, 23, 102, 0.5)",
  MODAL_BASIC_BUTTON: "#E58363",
  DISABLED_BASIC_BUTTON25: "rgba(229,131,99,0.25)",
  DISABLED_BASIC_BUTTON01: "rgba(229,131,99,0.01)",
  GREEN: "#76A470",
  GREEN_OPACITY: "rgba(118,164,112,0.15)",
  ORANGE: "#E19F30",
  ORANGE_DARK: "#E87325",
  RED: "#EF461A",
  RED_OPACITY2: "rgba(239,70,26, 0.2)",
};

const CAMERA_MASK_SIZES = {
  circle: {
    width: 250,
    height: 250,
  },
  document: {
    width: 300,
    height: 183,
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
  borderColor: COLORS.DARK_BACKGROUND,
  borderTopWidth: 0.2,
  borderLeftWidth: 0.2,
  borderRightWidth: 0.5,
  borderBottomWidth: 2,
};

const FONTSIZE = {
  H0: 50,
  H1: 46,
  H2: 30,
  H3: 24,
  H4: 20,
  H5: 18,
  H6: 16,
  H7: 14,
  H8: 12,
};

export default {
  COLORS,
  FONTSIZE,
  CAMERA_MASK_SIZES,
  SHADOW_STYLES,
  ANDROID_SHADOW_STYLES,
  ANDROID_BORDER_STYLES,
};
