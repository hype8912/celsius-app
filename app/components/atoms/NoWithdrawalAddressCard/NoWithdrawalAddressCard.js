import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import NoWithdrawalAddressCardStyle from "./NoWithdrawalAddressCard.styles";
import Card from "../Card/Card";
import CelText from "../CelText/CelText";
import CoinIcon from "../CoinIcon/CoinIcon";
import STYLES from "../../../constants/STYLES";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
                ? getColor(COLOR_KEYS.PRIMARY_BUTTON)
                : STYLES.COLORS.CELSIUS_BLUE_OPACITY5 // TODO: Missing COLOR_KEY
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
