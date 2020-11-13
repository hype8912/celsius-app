import { getPadding, getThemedStyle } from "../../../utils/styles-util";
import { StyleSheet } from "react-native";

const base = {
  container: {
    flex: 1,
  },
  spinner: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  rootView: {
    flex: 1,
    width: "100%",
    height: "100%",
    ...StyleSheet.flatten(getPadding("20 20 100 20"))
  },

  hodlCodeWrapper: {
    flexDirection: "row",
  },
  codeWrapper: {
    flex: 0.8,
  },
  textWrapper: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  hodlCodeOverlay: {
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  blurImageAndIconWrapper: {
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonIconHand: {
    alignSelf: "center",
    width: 22,
    height: 20,
  },
  longPressText: {
    marginStart: 10,
    alignSelf: "center",
  },

  blurImage: {
    flex: 1,
    backgroundColor: "white",

  },

  warningContainer: {
    flexDirection: "row",
  },

  warningText: {
    flexDirection: "column",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const HODLViewCodeStyles = () => getThemedStyle(base, themed);

export default HODLViewCodeStyles;
