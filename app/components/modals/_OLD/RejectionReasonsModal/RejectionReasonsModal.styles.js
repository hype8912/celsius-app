// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bullet: {
    textAlign: "center",
    flex: 0.05,
  },
  text: {
    flex: 0.95,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const RejectionReasonsModalStyle = () => getThemedStyle(base, themed);

export default RejectionReasonsModalStyle;
