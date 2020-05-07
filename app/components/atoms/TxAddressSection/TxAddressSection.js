import React from "react";
import PropTypes from "prop-types";
import { Linking, TouchableOpacity, View } from "react-native";

import AddressSectionStyle from "./TxAddressSection.styles";
import Card from "../Card/Card";
import CelText from "../CelText/CelText";
import STYLES from "../../../constants/STYLES";
import Icon from "../Icon/Icon";
import { getBlockExplorerLink } from "../../../utils/crypto-util";

const TxAddressSection = ({ transaction, text, address }) => {
  const style = AddressSectionStyle();
  const link = getBlockExplorerLink(transaction);

  return link ? (
    <View>
      <Card>
        <View style={style.content}>
          <CelText>{text}</CelText>
        </View>
        {address && (
          <CelText weight="500" type="H4">
            {address.split("?")[0]}
          </CelText>
        )}

        {!!transaction.transaction_id && !!link.link && (
          <TouchableOpacity
            style={style.button}
            onPress={() => Linking.openURL(link.link)}
          >
            <CelText color={STYLES.COLORS.CELSIUS_BLUE}>
              View on {link.text}
            </CelText>
            <Icon
              name="NewWindowIcon"
              height="16"
              width="16"
              fill={STYLES.COLORS.CELSIUS_BLUE}
              style={{ marginTop: 5, marginLeft: 10 }}
            />
          </TouchableOpacity>
        )}
      </Card>
      {transaction.coin === "xrp" && address && (
        <Card margin={"10 0 20 0"}>
          <CelText weight="500" type="H4">
            Destination Tag: {address.split("=")[1]}
          </CelText>
        </Card>
      )}
      {(transaction.coin === "xlm" || transaction.coin === "eos") && address && (
        <Card margin={"10 0 20 0"}>
          <CelText weight="500" type="H4">
            Memo ID: {address.split("=")[1]}
          </CelText>
        </Card>
      )}
    </View>
  ) : null;
};

TxAddressSection.propTypes = {
  transaction: PropTypes.instanceOf(Object),
  address: PropTypes.string,
  text: PropTypes.string,
};

export default TxAddressSection;
