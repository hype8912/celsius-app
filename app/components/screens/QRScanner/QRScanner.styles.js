import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  barcodeWrapper: {
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  mask: { flex: 1 },
  image: {
    width: 250,
    height: 250,
    alignSelf: "center",
  },
  imageWrapper: { flexDirection: "row" },
  safeArea: { flex: 1, flexDirection: "row", marginBottom: 20 },
  permission: { flex: 1, flexWrap: "wrap", paddingHorizontal: 20 },
  view: {
    width: 250,
    alignSelf: "center",
    marginTop: 20,
  },
  maskOverlayColor: {
    backgroundColor: COLOR_KEYS.MAIN_MENU_OVERLAY, // TODO: check with others (sabelnik)
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const QRScannerStyle = () => getThemedStyle(base, themed);

export default QRScannerStyle;
