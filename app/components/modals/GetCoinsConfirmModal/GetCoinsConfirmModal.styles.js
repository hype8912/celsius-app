// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1
  },
  infoBlock: {
    backgroundColor: STYLES.COLORS.LIGHT_GRAY,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 8,
    padding: 20
  },
  transferData: {
    marginHorizontal: 20
  },
  transferDataItem: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 25,
    justifyContent: "space-between"
  },
  buttonsWrapper: {
    justifyContent: "flex-end",
    marginTop: 20,
    height: 50,
  }
}

const themed = {
  light: {},

  dark: {},

  celsius: {}
}

const GetCoinsConfirmModalStyle = () => getThemedStyle(base, themed);

export default GetCoinsConfirmModalStyle
