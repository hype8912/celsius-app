// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: { paddingHorizontal: 20 },
  text: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
  },
  content: { justifyContent: "space-between", flexDirection: "row" },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderColor: "#ffffff",
    borderWidth: 3,
  },
  data: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    paddingLeft: 10,
  },
  textTwo: { paddingTop: 5 },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const ReferralSectionStyle = () => getThemedStyle(base, themed);

export default ReferralSectionStyle;
