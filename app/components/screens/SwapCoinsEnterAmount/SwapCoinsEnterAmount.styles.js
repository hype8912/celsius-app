import { Dimensions } from "react-native";
import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const { width } = Dimensions.get("window");

const base = {
  container: {
    flex: 1,
  },
  fiatSection: {
    alignItems: "center",
    paddingVertical: 10,
  },
  cryptoSection: {
    alignItems: "center",
    paddingVertical: 10,
  },
  fiatWrapper: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  amounts: {
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
    width: width - widthPercentageToDP("10%"),
    marginHorizontal: 20,
  },
};

const themed = {
  light: {
    text: {
      color: STYLES.COLORS.MEDIUM_GRAY,
    },
  },

  dark: {
    text: {
      color: STYLES.COLORS.WHITE_OPACITY5,
    },
  },

  unicorn: {},
};

const SwapoinsEnterAmountStyle = () => getThemedStyle(base, themed);

export default SwapoinsEnterAmountStyle;
