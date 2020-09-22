// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  wrapper: {
    padding: 12,
    justifyContent: "space-around",
    flex: 0.5,
    flexWrap: "wrap",
    flexDirection: "row",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tierText: { flex: 0.9 },
  discount: { padding: 12 },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const TierCardStyle = () => getThemedStyle(base, themed);

export default TierCardStyle;
