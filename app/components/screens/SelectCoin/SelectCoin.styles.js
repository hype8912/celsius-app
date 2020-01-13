// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 12,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    borderRadius: 8,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    width: 35,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const SelectCoinStyle = () => getThemedStyle(base, themed);

export default SelectCoinStyle;
