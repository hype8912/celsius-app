import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import DepositStyle from "./Deposit.styles";
import { EMPTY_STATES, MODALS } from "../../../constants/UI";
import Spinner from "../../atoms/Spinner/Spinner";
import CoinPicker from "../../molecules/CoinPicker/CoinPicker";
import StaticScreen from "../StaticScreen/StaticScreen";
import IconButton from "../../organisms/IconButton/IconButton";
import MemoIdModal from "../../modals/MemoIdModal/MemoIdModal";
import DepositInfoModal from "../../modals/DepositInfoModal/DepositInfoModal";
import { hasPassedKYC, isPendingKYC } from "../../../utils/user-util/user-util";
import formatter from "../../../utils/formatter";
import DestinationInfoTagModal from "../../modals/DestinationInfoTagModal/DestinationInfoTagModal";
import RateInfoCard from "../../molecules/RateInfoCard/RateInfoCard";
import DepositAddressSwitchCard from "../../atoms/DepositAddressSwitchCard/DepositAddressSwitchCard";
import { SCREENS } from "../../../constants/SCREENS";
import LinkToBuy from "../../atoms/LinkToBuy/LinkToBuy";
import DepositAddressCard from "../../organisms/DepositAddressCard/DepositAddressCard";
import addressUtil from "../../../utils/address-util";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import AdditionalAmountCard from "../../molecules/AdditionalAmountCard/AdditionalAmountCard";
import { renderAdditionalDepositCardContent } from "../../../utils/ui-util";

@connect(
  state => ({
    formData: state.forms.formData,
    walletAddresses: state.wallet.addresses,
    depositCompliance: state.compliance.deposit,
    walletSummary: state.wallet.summary,
    currencyRatesShort: state.currencies.currencyRatesShort,
    currencies: state.currencies.rates,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Deposit extends Component {
  static navigationOptions = () => ({
    title: "Transfer coins",
    right: "profile",
  });

  constructor(props) {
    super(props);
    const { depositCompliance, currencies, navigation, actions } = props;

    const coinSelectItems =
      currencies &&
      currencies
        .filter(c => depositCompliance.coins.includes(c.short))
        .map(c => ({
          label: `${formatter.capitalize(c.name)} (${c.short})`,
          value: c.short,
        }));
    this.state = { coinSelectItems };

    const currencyFromNav = navigation.getParam("coin");
    actions.updateFormField("selectedCoin", currencyFromNav || "ETH");
    this.fetchAddress(currencyFromNav || "ETH");
    actions.openModal(MODALS.DEPOSIT_INFO_MODAL);
  }

  getAddress = currency => {
    const { walletAddresses } = this.props;
    if (!currency) return {};

    const fullAddress = walletAddresses[`${currency}Address`];
    if (!fullAddress) return {};

    const { base, tag } = addressUtil.splitAddressTag(fullAddress);
    const secondaryAddress = walletAddresses[`${currency}SecondaryAddress`];
    return {
      address: base,
      tag,
      secondaryAddress,
    };
  };

  handleCoinSelect = async (field, item) => {
    const { actions } = this.props;
    actions.openModal(MODALS.DEPOSIT_INFO_MODAL);
    actions.updateFormField(field, item);
    await this.fetchAddress(item);
  };

  fetchAddress = async currency => {
    const { actions, walletAddresses } = this.props;
    if (!hasPassedKYC()) return;

    if (!walletAddresses[`${currency}Address`])
      await actions.getCoinAddress(currency);

    const { address } = this.getAddress(currency);
    actions.updateFormField("displayAddress", address);
  };

  renderPayCard = () => {
    const { navigation } = this.props;
    const coin = navigation.getParam("coin");
    const amountUsd = navigation.getParam("amountUsd");
    const additionalCryptoAmount = navigation.getParam(
      "additionalCryptoAmount"
    );
    const reason = navigation.getParam("reason");
    const additional = renderAdditionalDepositCardContent(
      reason,
      amountUsd,
      additionalCryptoAmount
    );

    return (
      <View style={{ margin: 20 }}>
        <AdditionalAmountCard
          color={additional.color}
          additionalUsd={additional.usd}
          additionalCryptoAmount={additional.crypto}
          text={additional.text}
          coin={coin}
        />
      </View>
    );
  };

  render() {
    const {
      actions,
      formData,
      depositCompliance,
      navigation,
      walletSummary,
      callsInProgress,
    } = this.props;

    const { address, secondaryAddress, tag } = this.getAddress(
      formData.selectedCoin
    );
    const isMarginCall = navigation.getParam("isMarginCall");
    const reason = navigation.getParam("reason");
    const { coinSelectItems } = this.state;
    const styles = DepositStyle();

    const coinInfo = walletSummary.coins.find(
      c => c.short === formData.selectedCoin
    );

    let emptyState = null;
    if (isPendingKYC()) {
      emptyState = EMPTY_STATES.VERIFICATION_IN_PROCESS_DEPOSIT;
    }
    if (!hasPassedKYC() && !isPendingKYC()) {
      emptyState = EMPTY_STATES.NON_VERIFIED_DEPOSIT;
    }
    if (!depositCompliance.allowed) {
      emptyState = EMPTY_STATES.COMPLIANCE;
    }
    if (emptyState) {
      return <StaticScreen emptyState={{ purpose: emptyState }} />;
    }

    const isFetching = apiUtil.areCallsInProgress(
      [API.GET_COIN_ADDRESS],
      callsInProgress
    );

    return (
      <RegularLayout padding={"20 20 100 20"}>
        {isMarginCall ? this.renderPayCard() : null}
        <CelText align="center" weight="regular" type="H4">
          Choose coin to transfer
        </CelText>
        <CoinPicker
          type={"withIcon"}
          updateFormField={actions.updateFormField}
          onChange={this.handleCoinSelect}
          coin={formData.selectedCoin}
          field="selectedCoin"
          availableCoins={coinSelectItems}
          navigateTo={actions.navigateTo}
        />

        {(isFetching || !formData.displayAddress) && (
          <View style={styles.loader}>
            <Spinner />
          </View>
        )}

        {formData.displayAddress && !isFetching ? (
          <View>
            <DepositAddressCard
              address={formData.displayAddress}
              coin={formData.selectedCoin}
              tag={tag}
              openModal={actions.openModal}
              showMessage={actions.showMessage}
            />

            <LinkToBuy
              coin={formData.selectedCoin}
              navigateTo={actions.navigateTo}
            />

            <DepositAddressSwitchCard
              coin={formData.selectedCoin}
              primaryAddress={address}
              secondaryAddress={secondaryAddress}
              displayAddress={formData.displayAddress}
              setAddress={addressToDisplay =>
                actions.updateFormFields({ displayAddress: addressToDisplay })
              }
            />
          </View>
        ) : null}

        {reason ? (
          <View>{!isMarginCall && this.renderPayCard()}</View>
        ) : (
          <View>
            <RateInfoCard
              style={styles.rateInfoCard}
              coin={coinInfo}
              navigateTo={actions.navigateTo}
              celInterestButton
            />
          </View>
        )}

        {formData.selectedCoin === "CEL" ? (
          <View style={{ marginLeft: 20, marginRight: 20 }}>
            <IconButton
              margin="20 0 0 0"
              padding="15 18 15 18"
              onPress={() => actions.navigateTo(SCREENS.LOYALTY_PROGRAM)}
            >
              Learn about the CEL Loyalty Program
            </IconButton>
          </View>
        ) : null}

        <DestinationInfoTagModal closeModal={actions.closeModal} />
        <MemoIdModal
          closeModal={actions.closeModal}
          coin={formData.selectedCoin}
        />
        <DepositInfoModal type={formData.selectedCoin} />
      </RegularLayout>
    );
  }
}

export default Deposit;
