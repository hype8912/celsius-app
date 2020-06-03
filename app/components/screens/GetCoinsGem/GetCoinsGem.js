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

const { GEM_URL, GEM_API_KEY } = Constants;

const onrampConfig = {
  partnerName: "Celsius",
  partnerIconUrl: "",
  apiKey: GEM_API_KEY,
};

const GemMessages = {
  SUCCESS: "__GEM_SUCCESS",
  EXIT: "__GEM_EXIT",
};

const coins = ["BTC", "ETH"];

@connect(
  state => ({
    eligibleCoins: getDepositEligibleCoins(state),
    formData: state.forms.formData,
    walletAddresses: state.wallet.addresses,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class GetCoinsGem extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    headerSameColor: false,
    transparent: true,
    hideBack: true,
    gesturesEnabled: false,
  });

  componentDidMount() {
    const { walletAddresses, actions } = this.props;

    coins.forEach(c => {
      if (!walletAddresses[`${c}Address`]) {
        actions.getCoinAddress(c);
      }
    });
  }

  onGemSuccess = data => {
    const { actions } = this.props;
    // TODO: create GEM transaction in DB
    // eslint-disable-next-line no-console
    console.log({ data });
    actions.showMessage("success", "Successfully bought crypto! Yay!");
    actions.navigateBack();
  };

  onGemExit = data => {
    const { actions } = this.props;
    // eslint-disable-next-line no-console
    console.log({ data });
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
    const { walletAddresses } = this.props;

    onrampConfig.wallets = coins.map(c => ({
      asset: c.toLowerCase(),
      address: walletAddresses[`${c}Address`],
    }));

    const queryConfig = qs.stringify({
      ...onrampConfig,
      wallets: JSON.stringify(onrampConfig.wallets),
    });

    return `${GEM_URL}?${queryConfig}`;
  };

  render() {
    const { walletAddresses } = this.props;

    let areAddressesFetched = true;
    coins.forEach(c => {
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
