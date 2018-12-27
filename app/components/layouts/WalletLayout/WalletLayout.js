// TODO(fj): prbably new one in v3

import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import get from "lodash/get";

import * as appActions from "../../../redux/actions";
// import {STYLES} from "../../config/constants/style";
import WalletLayoutStyle from "./WalletLayout.styles";
import BasicLayout from "../BasicLayout/BasicLayout";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";
import TabNavigation from "../../molecules/TabNavigation/TabNavigation";
import formatter from "../../../utils/formatter";
import CelScreenContent from "../../atoms/CelScreenContent/CelScreenContent";
import testUtil from "../../../utils/test-util";
import EmptyState from "../../atoms/EmptyState/EmptyState";


@connect(
  state => ({
    walletTotal: state.wallet.total,
    activeScreen: state.nav.routes[state.nav.index].routeName,
    appSettings: state.users.appSettings
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WalletLayout extends Component {
  // lifecycle methods
  componentDidMount() {
    this.props.actions.getWalletDetails();
  }

  componentWillReceiveProps(nextProps) {
    const { activeScreen, actions } = this.props;

    if (activeScreen !== nextProps.activeScreen &&
      ["WalletBalance", "WalletTransactions", "WalletInterest", "Home"].indexOf(nextProps.activeScreen) !== -1) {
      actions.getWalletDetails();
    }
  }

  tabs = [
    { label: "Balance", screen: "WalletBalance" },
    { label: "Transactions", screen: "WalletTransactions" },
    { label: "Interest", screen: "WalletInterest" }
  ];

  // rendering methods
  render() {
    const { walletTotal, appSettings, activeScreen } = this.props;
    const total = get(walletTotal, "quotes.USD.total", 0);

    if (appSettings.declineAccess && activeScreen !== "WalletBalance") {
      return (
        <BasicLayout bottomNavigation>
          <MainHeader backButton={false}/>
          <View style={WalletLayoutStyle.heading}>
            {!!walletTotal && <Text style={WalletLayoutStyle.amountText}>{formatter.usd(total)}</Text>}
            {!walletTotal && <Image source={require("../../../../assets/images/icons/white_spinner.gif")}
                                    style={WalletLayoutStyle.totalLoader}/>}
            <Text style={WalletLayoutStyle.subheadingText}>WALLET BALANCE</Text>
          </View>
          <TabNavigation tabs={this.tabs} />
          <EmptyState purpose={"NycBlackout"}/>
        </BasicLayout>
      )
    }

    return (
      <BasicLayout bottomNavigation>
        <MainHeader backButton={false}/>
        <View
          ref={testUtil.generateTestHook(this, `WalletLayout.home`)}
          style={WalletLayoutStyle.heading}
        >
          {!!walletTotal && <Text style={WalletLayoutStyle.amountText}>{formatter.usd(total)}</Text>}
          {!walletTotal && <Image source={require("../../../../assets/images/icons/white_spinner.gif")}
                                  style={WalletLayoutStyle.totalLoader}/>}
          <Text style={WalletLayoutStyle.subheadingText}>WALLET BALANCE</Text>
        </View>
        <TabNavigation tabs={this.tabs} />

        <CelScreenContent>
          {this.props.children}
        </CelScreenContent>

      </BasicLayout>
    );
  }
}

export default testUtil.hookComponent(WalletLayout);
