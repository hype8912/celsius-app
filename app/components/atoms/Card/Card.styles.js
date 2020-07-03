import { Platform } from "react-native";
import STYLES from "../../../constants/STYLES";

import {
  getThemedStyle,
  widthPercentageToDP,
  getColor,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  card: {
    justifyContent: "center",
    borderRadius: 8,
  },
  cardBorder: {
    ...Platform.select({
      android: {
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
  full: {
    width: "100%", // -40 because RegularLayout padding is 20 on both sides
  },
  twoThirds: {
    width: widthPercentageToDP("60%"),
  },
  half: {
    width: widthPercentageToDP("50%") - 28, // -28 because RegularLayout padding is 20 and gap between two cards should be 16 so 16/2 = 8
  },
  halfExtra: {
    width: widthPercentageToDP("40.5%") - 28, // -28 because RegularLayout padding is 20 and gap between two cards should be 16 so 16/2 = 8
  },
  third: {
    width: widthPercentageToDP("26.93%"),
  },
  thirdExtra: {
    width: widthPercentageToDP("20.5%"),
    minWidth: widthPercentageToDP("20.5%"),
  },
  cardBackground: {
    backgroundColor: getColor(COLOR_KEYS.CARDS),
  },
};

const themed = {
  light: {
    cardBorder: {
      ...Platform.select({
        android: {
          borderColor: "#E9E9E9",
        },
      }),
    },
  },

  dark: {
    cardBorder: {
      ...Platform.select({
        android: {
          borderColor: STYLES.COLORS.BLACK_OPACITY2,
        },
      }),
    },
  },

  unicorn: {},
};

const CardStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default CardStyle;
