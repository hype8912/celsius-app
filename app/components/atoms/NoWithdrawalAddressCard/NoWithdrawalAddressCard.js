import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import NoWithdrawalAddressCardStyle from "./NoWithdrawalAddressCard.styles";
import Card from "../Card/Card";
import CelText from "../CelText/CelText";
import CoinIcon from "../CoinIcon/CoinIcon";
import STYLES from "../../../constants/STYLES";

const NoWithdrawalAddressCard = ({
  coinName,
  coinShort,
  imageUrl,
  onPress,
  disabledPress,
}) => {
  NoWithdrawalAddressCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    coinShort: PropTypes.string.isRequired,
    coinName: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    disabledPress: PropTypes.bool,
  };

  const style = NoWithdrawalAddressCardStyle();

  return (
    <Card>
      <View style={style.bodyWrapper}>
        <View style={{ alignSelf: "flex-start" }}>
          <CoinIcon
            customStyles={style.size}
            coinShort={coinShort}
            url={imageUrl}
          />
        </View>
        <View style={style.cardBody}>
          <View style={style.cardHeader}>
            <CelText weight="600">{`${coinName} (${coinShort})`}</CelText>
          </View>
          <CelText
            margin="5 0 0 0"
            type="H6"
            weight="400"
            color={
              !disabledPress
                ? STYLES.COLORS.CELSIUS_BLUE
                : STYLES.COLORS.CELSIUS_BLUE_OPACITY5
            }
            onPress={!disabledPress ? onPress : () => {}}
          >
            Add withdrawal address
          </CelText>
        </View>
      </View>
    </Card>
  );
};

export default NoWithdrawalAddressCard;
