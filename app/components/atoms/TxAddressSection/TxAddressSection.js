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
    <View style={style.container}>
      <Card margin={"20 0 20 0"}>
        <View style={style.content}>
          <CelText>{text}</CelText>
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
                height="17"
                width="17"
                fill={STYLES.COLORS.CELSIUS_BLUE}
                style={{ marginLeft: 5 }}
              />
            </TouchableOpacity>
          )}
        </View>
        {address && (
          <CelText weight="500" type="H4">
            {address.split("?")[0]}
          </CelText>
        )}
      </Card>
      {transaction.coin === "xrp" && (
        <Card margin={"10 0 20 0"}>
          <CelText weight="500" type="H4">
            Destination Tag: {address.split("=")[1]}
          </CelText>
        </Card>
      )}
      {(transaction.coin === "xlm" || transaction.coin === "eos") && (
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
