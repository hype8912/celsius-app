import React, { Component } from "react";
import WebView from "react-native-webview";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import qs from "qs";

import * as appActions from "../../../redux/actions";
import { getDepositEligibleCoins } from "../../../redux/custom-selectors";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Constants from "../../../../constants";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";

const { GEM_URL, GEM_API_KEY } = Constants;

const onrampConfig = {
  partnerName: "Celsius",
  partnerIconUrl:
    "https://raw.githubusercontent.com/CelsiusNetwork/celsius-app/develop/assets/images/icons/logo-blue.png",
  apiKey: GEM_API_KEY,
  customThemeName: "celsius",
};

const GemMessages = {
  SUCCESS: "__GEM_SUCCESS",
  EXIT: "__GEM_EXIT",
};

@connect(
  state => ({
    eligibleCoins: getDepositEligibleCoins(state),
    formData: state.forms.formData,
    walletAddresses: state.wallet.addresses,
    user: state.user.profile,
    gemCompliance: state.compliance.gem,
    currencies: state.currencies.rates,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class GetCoinsGem extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    hideHeading: true,
  });

  componentDidMount() {
    const { walletAddresses, actions, gemCompliance } = this.props;

    gemCompliance.coins.forEach(c => {
      if (!walletAddresses[`${c}Address`]) {
        actions.getCoinAddress(c);
      }
    });
  }

  onGemSuccess = async data => {
    const { actions, currencies } = this.props;
    await actions.createGemPayment(data.userId, data.transactionId);
    actions.showMessage("success", "You have successfully purchased crypto!");
    actions.navigateBack();

    const currency = currencies.find(c => c.name === data.destinationCurrency);
    const amountUsd = data.destinationAmount * currency.market_quotes_usd.price;

    mixpanelAnalytics.finishedBuyCoinsFlow(
      "WIRE",
      currency.short,
      data.sourceCurrency.toUpperCase(),
      amountUsd,
      data.sourceAmount,
      data.destinationAmount,
      "success",
      "gem"
    );
  };

  onGemExit = async data => {
    const { actions } = this.props;
    await actions.createGemPayment(data.userId);
    actions.navigateBack();
  };

  finishGemFlow = event => {
    const { data = "" } = event.nativeEvent;
    const [title, stringifiedData] = data.split("|");

    switch (title) {
      case GemMessages.SUCCESS:
        this.onGemSuccess(JSON.parse(stringifiedData));
        break;
      case GemMessages.EXIT:
        this.onGemExit(JSON.parse(stringifiedData));
        break;
      default:
        return;
    }
  };

  createGemUrl = () => {
    const { walletAddresses, user, gemCompliance } = this.props;

    onrampConfig.wallets = gemCompliance.coins.map(c => ({
      asset: c.toLowerCase(),
      address: walletAddresses[`${c}Address`],
    }));
    onrampConfig.userEmail = user.email;

    const queryConfig = qs.stringify({
      ...onrampConfig,
      wallets: JSON.stringify(onrampConfig.wallets),
    });

    return `${GEM_URL}?${queryConfig}`;
  };

  render() {
    const { walletAddresses, gemCompliance } = this.props;

    let areAddressesFetched = true;
    gemCompliance.coins.forEach(c => {
      areAddressesFetched =
        areAddressesFetched && !!walletAddresses[`${c}Address`];
    });

    if (!areAddressesFetched) {
      return <LoadingScreen />;
    }

    const gemOnrampSrc = this.createGemUrl();

    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{
            uri: gemOnrampSrc,
          }}
          onMessage={this.finishGemFlow}
        />
      </View>
    );
  }
}

export default GetCoinsGem;
