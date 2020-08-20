import { StyleSheet, Platform } from "react-native";

import { getPadding, getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    height: 50,
    ...StyleSheet.flatten(getPadding("10 16 13 16")),
    borderRadius: 8,
    // ...Platform.select({
    //   android: {
    //     borderColor: "#E9E9E9",
    //     borderTopWidth: 0.2,
    //     borderLeftWidth: 0.2,
    //     borderRightWidth: 0.5,
    //     borderBottomWidth: 2,
    //   },
    //   ios: {
    //     ...STYLES.SHADOW_STYLES,
    //   },
    // }),
    backgroundColor: COLOR_KEYS.CARDS,
  },
  disabledInput: {
    opacity: 0.6,
  },
  flagImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  iconColor: {
    color: COLOR_KEYS.PARAGRAPH,
  },
  textColor: {
    color: COLOR_KEYS.HEADLINE,
  },
};

const themed = {
  light: {},
  dark: {
    container: {
      ...Platform.select({
        android: {
          borderColor: COLOR_KEYS.TRANSPARENT,
        },
      }),
    },
  },
  unicorn: {},
};

const CelSelectStyle = () => getThemedStyle(base, themed);

export default CelSelectStyle;
