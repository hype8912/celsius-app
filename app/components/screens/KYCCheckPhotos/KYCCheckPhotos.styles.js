import { Dimensions } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";

const { width, height } = Dimensions.get("window");

const base = {
  container: {
    flex: 1,
  },
  photoWrapper: {
    alignItems: "center",
    overflow: "hidden",
    width: 300,
    height: 180,
    borderRadius: 15,
    marginHorizontal: 20,
  },
  photo: {
    width: 0.8 * width,
    height: 0.8 * height,
    marginBottom: 30,
    position: "absolute",
    top: -0.19 * height,
  }
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const KYCCheckPhotosStyle = () => getThemedStyle(base, themed);

export default KYCCheckPhotosStyle;
