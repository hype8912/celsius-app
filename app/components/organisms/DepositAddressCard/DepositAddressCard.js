import React from "react";
import { TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

import DepositAddressCardStyle from "./DepositAddressCard.styles";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import CopyButton from "../../atoms/CopyButton/CopyButton";
import ShareButton from "../../atoms/ShareButton/ShareButton";
import Icon from "../../atoms/Icon/Icon";
import { COLOR_KEYS } from "../../../constants/COLORS";
import addressUtil from "../../../utils/address-util";
import { MODALS } from "../../../constants/UI";

const DepositAddressCard = ({ address, tag, coin, showMessage, openModal }) => {
  const styles = DepositAddressCardStyle();
  const isXRP = coin === "XRP";
  return (
    <View style={styles.container}>
      {addressUtil.hasCoinTag(coin) ? (
        <Card>
          <View style={styles.cardWrapper}>
            <CelText>{isXRP ? "Destination Tag:" : "Memo Id"}</CelText>
            <View style={styles.tagWrapper}>
              <CelText weight={"500"}>{tag}</CelText>
              <TouchableOpacity
                onPress={() => {
                  const modal = isXRP
                    ? MODALS.DESTINATION_TAG_MODAL
                    : MODALS.MEMO_ID_MODAL;
                  openModal(modal);
                }}
              >
                <Icon
                  name="Info"
                  height="20"
                  width="20"
                  fill={COLOR_KEYS.HEADLINE}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.copyShareWrapper}>
            <Separator />
            <View style={styles.copyShareButtonsWrapper}>
              <CopyButton
                copyText={tag}
                onCopy={() =>
                  showMessage("success", "Tag copied to clipboard!")
                }
              />
              <Separator vertical />
              <ShareButton shareText={tag} />
            </View>
          </View>
        </Card>
      ) : null}

      <Card>
        <View style={styles.qrCode}>
          <View style={styles.qrCodeWrapper}>
            <QRCode value={address} size={100} bgColor="#FFF" fgColor="#000" />
          </View>
          <CelText type="H4" align={"center"} margin="10 0 10 0">
            {address}
          </CelText>

          <View style={styles.copyShareWrapper}>
            <Separator />
            <View style={styles.copyShareButtonsWrapper}>
              <CopyButton
                onCopy={() =>
                  showMessage("success", "Address copied to clipboard!")
                }
                copyText={address}
              />
              <Separator vertical />
              <ShareButton shareText={address} />
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default DepositAddressCard;
