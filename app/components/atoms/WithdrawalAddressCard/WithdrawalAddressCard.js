import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import WithdrawalAddressCardStyle from "./WithdrawalAddressCard.styles";
import Card from "../Card/Card";
import CelText from "../CelText/CelText";
import CelButton from "../CelButton/CelButton";
import CoinIcon from "../CoinIcon/CoinIcon";
import RoundedBadge from "../RoundedBadge/RoundedBadge";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const WithdrawalAddressCard = ({
  coinShort,
  coinName,
  imageUrl,
  onPress,
  onPressAddressLabel,
  withdrawalAddress,
  hodlStatus,
}) => {
  const style = WithdrawalAddressCardStyle();
  const opacity = withdrawalAddress.locked ? 0.5 : 1;
  const btnOpacity = hodlStatus.isActive ? 0.5 : 1;

  const renderWithdrawalAddressLabel = () => {
    if (withdrawalAddress.locked)
      return <CelText>Address change in progress...</CelText>;
    if (withdrawalAddress.label) {
      return (
        <RoundedBadge
          color={getColor(COLOR_KEYS.BACKGROUND)}
          onPress={onPressAddressLabel}
          text={withdrawalAddress.label}
        />
      );
    }
    return (
      <CelButton size="small" onPress={() => onPressAddressLabel()} basic>
        + Add label
      </CelButton>
    );
  };

  return (
    <Card>
      <View style={[style.bodyWrapper, { opacity }]}>
        <View style={{ alignSelf: "flex-start" }}>
          <CoinIcon
            customStyles={style.size}
            coinShort={coinShort}
            url={imageUrl}
          />
        </View>
        <View style={style.cardBody}>
          <View style={style.cardHeader}>
            <View style={{ flex: 0.7 }}>
              <CelText weight="600">{coinName}</CelText>
            </View>
            <View style={{ flex: 0.3, opacity: btnOpacity }}>
              {!withdrawalAddress.locked ? (
                <CelButton
                  disabled={hodlStatus.isActive}
                  size="small"
                  onPress={() => onPress()}
                  basic
                >
                  Change
                </CelButton>
              ) : null}
            </View>
          </View>
          <CelText margin="5 0 0 0" type="H6" weight="300">
            {withdrawalAddress.address}
          </CelText>
          {renderWithdrawalAddressLabel()}
        </View>
      </View>
    </Card>
  );
};

WithdrawalAddressCard.propTypes = {
  imageUrl: PropTypes.string,
  coinShort: PropTypes.string,
  coinName: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  onPressAddressLabel: PropTypes.func,
  withdrawalAddress: PropTypes.instanceOf(Object),
  theme: PropTypes.string,
  hodlStatus: PropTypes.bool,
};

export default WithdrawalAddressCard;
