import { Platform, Dimensions } from "react-native";
import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const { width } = Dimensions.get("window");

const base = {
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      Platform.OS === "android"
        ? "rgba(243,243,243,0.9)"
        : "rgba(243,243,243,0)",
    flex: 4,
  },
  modal: {
    backgroundColor: "white",
    width: widthPercentageToDP("90%"),
    borderRadius: 8,
    zIndex: 3,
  },
  outsideCloseModal: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: "absolute",
    zIndex: 0,
  },
  closeBtn: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "transparent",
    zIndex: 10,
  },
  imageWrapper: {
    position: "absolute",
    zIndex: 10,
    top: -heightPercentageToDP("20%") / 1.7,
    left: widthPercentageToDP("80%") / 2 - heightPercentageToDP("18%") / 2,
  },
  modalImage: {
    width: heightPercentageToDP("22.5%"),
    height: heightPercentageToDP("22.5%"),
  },
  contentWrapper: {
    marginTop: 100,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 20,
  },
  contentWrapperCelPay: {
    marginTop: 100,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 20,
    paddingTop: 40,
  },
  contentWrapperWithdraw: {
    height: width * 0.95,
    marginTop: 100,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 20,
  },
  contentWrapperDeposit: {
    // height: width * 0.85,
    marginTop: 100,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 20,
  },
  modalHeadingWrapper: {
    position: "absolute",
    top: 0,
    width: widthPercentageToDP("90%"),
    height: heightPercentageToDP("15.5%"),
    paddingTop: 5,
    backgroundColor: STYLES.COLORS.LIGHT_GRAY,
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 5,
  },
  imageWrapperCircle: {
    width: widthPercentageToDP("28.8%"),
    height: widthPercentageToDP("28.8%"),
    borderRadius: widthPercentageToDP("28.8%") / 2,
    backgroundColor: "white",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    top: -heightPercentageToDP("7.5%"),
    left: widthPercentageToDP("31.5%"),
    ...STYLES.SHADOW_STYLES,
  },
  modalImageCircle: {
    width: widthPercentageToDP("12%"),
    height: widthPercentageToDP("12%"),
  },
  screen: {
    width: widthPercentageToDP("80%"),
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "flex-start",
    borderRadius: 25,
    backgroundColor: "white",
    marginBottom: 40,
  },
  title: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
    color: STYLES.COLORS.DARK_GRAY,
  },
  description: {
    paddingHorizontal: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "#737A82",
  },
  modalButton: {
    marginTop: 0,
    backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
  },
  dotsWithdraw: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 120,
    paddingBottom: 10,
  },
  dotsDeposit: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 90,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const CelModalStyle = () => getThemedStyle(base, themed);

export default CelModalStyle;
