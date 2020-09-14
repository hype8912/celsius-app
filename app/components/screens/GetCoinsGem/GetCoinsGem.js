import React, { Component } from "react";
import WebView from "react-native-webview";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import qs from "qs";
import _ from "lodash";

import * as appActions from "../../../redux/actions";
import { getDepositEligibleCoins } from "../../../redux/custom-selectors";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Constants from "../../../../constants";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";
import GetCoinsGemStyle from "./GetCoinsGem.styles";

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
    walletGemAddresses: state.buyCoins.walletGemAddresses,
    user: state.user.profile,
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
    const { actions } = this.props;

    actions.getGemCoinAddress();
  }

  onGemSuccess = async data => {
    const { actions, currencies } = this.props;
    await actions.createGemPayment(data.userId, data.transactionId);
    actions.showMessage("success", "You have successfully purchased crypto!");

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

  onGemExit = async () => {
    const { actions } = this.props;
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
    const { walletGemAddresses, user } = this.props;
    onrampConfig.wallets = JSON.stringify(walletGemAddresses);
    onrampConfig.userEmail = user.email;
    const queryConfig = qs.stringify(onrampConfig);
    const gemURL = `${GEM_URL}?${queryConfig}`;

    return gemURL;
  };

  render() {
    const { walletGemAddresses } = this.props;
    if (_.isEmpty(walletGemAddresses)) {
      return <LoadingScreen />;
    }

    const gemOnrampSrc = this.createGemUrl();
    const styles = GetCoinsGemStyle();
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <WebView
            source={{
              uri: gemOnrampSrc,
            }}
            onMessage={this.finishGemFlow}
          />
        </View>
      </View>
    );
  }
}

export default GetCoinsGem;
