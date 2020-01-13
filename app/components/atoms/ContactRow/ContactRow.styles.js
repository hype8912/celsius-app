import { Platform } from "react-native";
import STYLES from "../../../constants/STYLES";
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
  },

  contactImageWrapper: {
    shadowColor: "#000000",
    borderRadius: 50 / 2,
    width: 50,
    height: 50,
    ...Platform.select({
      android: {
        borderColor: "#E9E9E9",
        borderTopWidth: 0.2,
        borderLeftWidth: 0.2,
        borderRightWidth: 0.5,
        borderBottomWidth: 2,
      },
      ios: {
        ...STYLES.SHADOW_STYLES,
      },
    }),
  },

  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderColor: "#ffffff",
    borderWidth: 2,
  },

  networkImage: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderColor: "#ffffff",
    borderWidth: 1,
    position: "absolute",
    right: 0,
    bottom: 0,
  },

  info: {
    justifyContent: "space-between",
    marginLeft: 15,
    paddingVertical: 5,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const ContactRowStyle = () => getThemedStyle(base, themed);

export default ContactRowStyle;
