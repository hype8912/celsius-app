import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

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
};

const themed = {
  light: {
    maskOverlayColor: {
      backgroundColor: "rgba(241,239,238,0.6)",
    },
    safeAreaBackgroundColor: {
      backgroundColor: "rgba(241,239,238,0.6)",
    },
  },

  dark: {
    maskOverlayColor: {
      backgroundColor: STYLES.COLORS.DARK_OVERLAY,
    },
    safeAreaBackgroundColor: {
      backgroundColor: STYLES.COLORS.DARK_OVERLAY,
    },
  },

  celsius: {
    maskOverlayColor: {
      backgroundColor: "rgba(241,239,238,0.6)",
    },
    safeAreaBackgroundColor: {
      backgroundColor: "rgba(241,239,238,0.6)",
    },
  },
};

const QRScannerStyle = () => getThemedStyle(base, themed);

export default QRScannerStyle;
