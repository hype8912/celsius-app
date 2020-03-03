// import STYLES from '../../../constants/STYLES';
import { Dimensions } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const { COLORS } = STYLES;
const { width } = Dimensions.get("window");

const baseContainer = {
  flexDirection: "row",
  position: "absolute",
  alignSelf: 'center',
  top: 0,
  width, 
  zIndex: 100,
  paddingTop: 40,
  paddingBottom: 15,
  paddingLeft: 20,
  paddingRight: 20,
  alignItems: "flex-start",
  justifyContent: "space-between",
  elevation: 1
};

const base = {
  infoContainer: {
    ...baseContainer,
    backgroundColor: COLORS.CELSIUS_BLUE
  },
  warningContainer: {
    ...baseContainer,
    backgroundColor: COLORS.ORANGE
  },
  errorContainer: {
    ...baseContainer,
    backgroundColor: COLORS.RED
  },
  successContainer: {
    ...baseContainer,
    backgroundColor: COLORS.GREEN
  },
  circle: {
    width: 29,
    height: 29,
    borderRadius: 15,
    // backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  closeButton: {
    width: "15%",
    paddingTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    opacity: 0.5
  },
  closeButtonView: {
    width: 50,
    height: 50,
    paddingTop: 12
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const MessageStyle = () => getThemedStyle(base, themed);

export default MessageStyle;
