// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  buttonsWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    height: 50,
  },
  footerContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
  },
  tableWrapper: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const CalculateLoayltyLevelModalStyle = () => getThemedStyle(base, themed);

export default CalculateLoayltyLevelModalStyle;
