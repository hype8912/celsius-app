import React, { Component } from "react";
import WebView from "react-native-webview";
import RNUxcam from 'react-native-ux-cam';
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";
import LoadingState from "../../atoms/LoadingState/LoadingState";
import Constants from "../../../../constants";
import store from "../../../redux/store";
import { navigateTo } from "../../../redux/nav/navActions";
import { SCREENS } from "../../../constants/SCREENS";

// fix https://github.com/facebook/react-native/issues/10865
const patchPostMessageJsCode = `(${String(function() {
  const originalPostMessage = window.ReactNativeWebView.postMessage;
  const patchedPostMessage = function(message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };
  patchedPostMessage.toString = function() {
    return String(Object.hasOwnProperty).replace(
      "hasOwnProperty",
      "postMessage"
    );
  };
  window.ReactNativeWebView.postMessage = patchedPostMessage;
})})();`;

@connect(
  state => ({
    simplexData: state.buyCoins.simplexData,
    paymentRequest: state.buyCoins.paymentRequest,
    fabType: state.ui.fabType,
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class SimplexScreen extends Component {
  static navigationOptions = () => ({
    title: "Get Coins",
    gesturesEnabled: false,
    customBack: () => {
      store.dispatch(navigateTo(SCREENS.GET_COINS_LANDING));
    },
  });

  constructor(props) {
    super(props);

    this.state = {
      webViewLoaded: false,
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    const self = this;

    const interval = setInterval(() => {
      self.setState({ webViewLoaded: true });
      clearInterval(interval);
    }, 2000);

    actions.setFabType("hide");
  }

  generateWebViewContent = data => {
    const { SIMPLEX_URL } = Constants;
    const originalForm = `<!DOCTYPE html>
       <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
       <body>
          <form id="payment_form" action="${SIMPLEX_URL}" method="post">
          <input type="hidden" name="version" value="${data.version}">
          <input type="hidden" name="partner" value="${data.partner}">
          <input type="hidden" name="payment_flow_type" value="wallet">
          <input type="hidden" name="return_url_success" value="${data.return_url_success}">
          <input type="hidden" name="return_url_fail" value="${data.return_url_fail}">
          <input type="hidden" name="quote_id" value="${data.quote_id}">
          <input type="hidden" name="payment_id" value="${data.payment_id}">
          <input type="hidden" name="user_id" value="${data.user_id}">
          <input type="hidden" name="destination_wallet[address]" value="${data.address}">
          <input type="hidden" name="destination_wallet[currency]" value="${data.coin}">
          <input type="hidden" name="fiat_total_amount[amount]" value="${data.fiat_money.total_amount}">
          <input type="hidden" name="fiat_total_amount[currency]" value="${data.fiat_money.currency}">
          <input type="hidden" name="digital_total_amount[amount]" value="${data.digital_money.amount}">
          <input type="hidden" name="digital_total_amount[currency]" value="${data.digital_money.currency}">
          </form>

          <script type="text/javascript">
            document.forms["payment_form"].submit();
          </script>
        </body>
      </html>
     `;
    return originalForm;
  };

  onMsg = event => {
    const { actions, formData } = this.props;
    if (event && event.nativeEvent && event.nativeEvent.data === "success") {
      // user passed successfully
      actions.resetToScreen(SCREENS.WALLET_LANDING);
      mixpanelAnalytics.finishedBuyCoinsFlow(
        "CARD",
        formData.cryptoCoin,
        formData.fiatCoin,
        formData.amountInUsd,
        formData.amountFiat,
        formData.amountCrypto,
        "success",
        "simplex"
      );
    } else {
      // user doesn't passed successfully
      actions.showMessage(
        "warning",
        "Simplex request failed. Please try again later."
      );
      mixpanelAnalytics.finishedBuyCoinsFlow(
        "CARD",
        formData.cryptoCoin,
        formData.fiatCoin,
        formData.amountInUsd,
        formData.amountFiat,
        formData.amountCrypto,
        "failed",
        "simplex"
      );
    }
  };

  render() {
    const { paymentRequest, simplexData } = this.props;
    const { webViewLoaded } = this.state;

    const data = {
      ...paymentRequest,
      ...simplexData,
    };

    return (
      <View style={{ flex: 1 }}>
        {(!webViewLoaded || !paymentRequest) && (
          <LoadingState heading="Please wait..." />
        )}

        <WebView
          ref= {view => RNUxcam.occludeSensitiveView(view)}
          style={{ opacity: webViewLoaded ? 1 : 0 }}
          onMessage={this.onMsg}
          javaScriptEnabled
          injectedJavaScript={patchPostMessageJsCode}
          automaticallyAdjustContentInsets
          source={{ html: this.generateWebViewContent(data) }}
        />
      </View>
    );
  }
}

export default SimplexScreen;
