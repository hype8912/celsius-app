import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import _ from "lodash";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as appActions from "../../../redux/actions";
import CheckWithdrawalAddressesCardStyle from "./CheckWithdrawalAddressesCard.styles";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";
import { getTheme } from "../../../utils/styles-util";
import ToggleInfoCard from "../../molecules/ToggleInfoCard/ToggleInfoCard";
import Card from "../../atoms/Card/Card";
import Icon from "../../atoms/Icon/Icon";

@connect(
  state => ({
    securityOverview: state.security.securityOverview,
    withdrawalAddresses: state.wallet.withdrawalAddresses,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CheckWithdrawalAddressesCard extends Component {
  static propTypes = {
    fromFixNow: PropTypes.bool,
  };

  onPress = () => {
    const { actions, fromFixNow } = this.props;
    if (fromFixNow) {
      actions.fromFixNow();
    }
    actions.navigateTo("WithdrawAddressOverview");
  };

  render() {
    const style = CheckWithdrawalAddressesCardStyle();
    const theme = getTheme();
    const { securityOverview, withdrawalAddresses } = this.props;

    if (_.isEmpty(securityOverview)) return;

    if (
      (_.size(withdrawalAddresses) ||
        securityOverview.withdrawal_addresses_whitelisted_count) ===
      securityOverview.withdrawal_addresses_count
    ) {
      return (
        <ToggleInfoCard
          enabled
          titleText={`${_.size(withdrawalAddresses) ||
            securityOverview.withdrawal_addresses_whitelisted_count}/${
            securityOverview.withdrawal_addresses_count
          }`}
          subtitle={"You added all withdrawal addresses"}
        />
      );
    }

    return (
      <Card margin="20 0 20 0" padding={"2 2 2 2"} styles={style.card}>
        <View style={{ justifyContent: "center" }}>
          <View
            style={[
              style.circle,
              {
                backgroundColor:
                  theme === "light"
                    ? STYLES.COLORS.DARK_GRAY1
                    : STYLES.COLORS.WHITE_OPACITY1,
              },
            ]}
          >
            <Icon
              name={"Shield"}
              fill={STYLES.COLORS.CELSIUS_BLUE}
              width={35}
              height={35}
            />
          </View>
        </View>
        <View style={style.infoTextWrapper}>
          <View style={style.infoSubtitleWrapper}>
            <CelText type="H2" weight="600">
              {_.size(withdrawalAddresses) ||
                securityOverview.withdrawal_addresses_whitelisted_count}
            </CelText>
            <CelText type="H4" margin="0 0 2 0">
              /{securityOverview.withdrawal_addresses_count}
            </CelText>
          </View>
          <CelText
            type="H6"
            weight={"600"}
            color={STYLES.COLORS.CELSIUS_BLUE}
            onPress={this.onPress}
            margin={"4 0 0 0"}
          >
            Check Withdrawal Addresses
          </CelText>
        </View>
      </Card>
    );
  }
}

export default CheckWithdrawalAddressesCard;
