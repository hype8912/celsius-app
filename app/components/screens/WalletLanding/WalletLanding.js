import React, { Component } from "react";
import { View, TouchableOpacity, BackHandler } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNavigationFocus } from "react-navigation";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelText from "../../atoms/CelText/CelText";
import WalletDetailsCard from "../../organisms/WalletDetailsCard/WalletDetailsCard";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Icon from "../../atoms/Icon/Icon";
import CelPayReceivedModal from "../../modals/CelPayReceivedModal/CelPayReceivedModal";
import { WALLET_LANDING_VIEW_TYPES, MODALS } from "../../../constants/UI";
import BecameCelMemberModal from "../../organisms/BecameCelMemberModal/BecameCelMemberModal";
import { KYC_STATUSES } from "../../../constants/DATA";
import EarnInterestCelModal from "../../organisms/EarnInterestCelModal/EarnInterestCelModal";
import { getSecureStoreKey } from "../../../utils/expo-storage";
import { isUSCitizen } from "../../../utils/user-util";
import MissingInfoCard from "../../atoms/MissingInfoCard/MissingInfoCard";
import ComingSoonCoins from "../../molecules/ComingSoonCoins/ComingSoonCoins";
import CoinCards from "../../organisms/CoinCards/CoinCards";
import WalletLandingStyle from "./WalletLanding.styles";
import KYCandPromotionsTrigger from "../../molecules/KYCandPromotionsTrigger/KYCandPromotionsTrigger";
import ExpandableItem from "../../molecules/ExpandableItem/ExpandableItem";
import LoanAlertsModalWrapper from "../../modals/LoanAlertsModals/LoanAlertsModalWrapper";

@connect(
  state => {
    const branchTransfer =
      state.branch.transferHash &&
      state.transfers.transfers[state.branch.transferHash]
        ? state.transfers.transfers[state.branch.transferHash]
        : null;

    return {
      branchTransfer,
      appSettings: state.user.appSettings,
      currenciesRates: state.currencies.rates,
      walletSummary: state.wallet.summary,
      currenciesGraphs: state.currencies.graphs,
      user: state.user.profile,
      kycStatus: state.user.profile.kyc
        ? state.user.profile.kyc.status
        : KYC_STATUSES.collecting,
      depositCompliance: state.compliance.deposit,
    };
  },
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WalletLanding extends Component {
  static propTypes = {};
  static defaultProps = {};
  static walletFetchingInterval;

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params && params.title ? params.title : "Welcome",
      right: "profile",
      hideBack: true,
    };
  };

  constructor(props) {
    super(props);

    const { navigation } = props;

    navigation.setParams({
      title: `Welcome ${props.user.first_name || ""}!`,
    });

    this.state = {
      activeView: props.appSettings.default_wallet_view,
      refreshing: false,
    };

    // NOTE (fj): quickfix for CN-2763
    this.shouldInitializeMembership = true;
  }

  componentDidMount = async () => {
    const {
      actions,
      appSettings,
      currenciesRates,
      currenciesGraphs,
      user,
    } = this.props;

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    if (appSettings && appSettings.accepted_terms_of_use === false) {
      return actions.navigateTo("TermsOfUse", {
        purpose: "accept",
        nextScreen: "WalletLanding",
      });
    }

    await actions.getWalletSummary();
    if (!currenciesRates) actions.getCurrencyRates();
    if (!currenciesGraphs) actions.getCurrencyGraphs();

    // NOTE (fj): quickfix for CN-2763
    // if (user.celsius_member) {
    if (this.shouldInitializeMembership) {
      actions.getCelsiusMemberStatus();
      this.shouldInitializeMembership = false;
    }
    const isCelInterestModalHidden = await getSecureStoreKey(
      "HIDE_MODAL_INTEREST_IN_CEL"
    );
    if (
      user.celsius_member &&
      !appSettings.interest_in_cel &&
      isCelInterestModalHidden !== "ON" &&
      !isUSCitizen()
    ) {
      actions.openModal(MODALS.EARN_INTEREST_CEL);
    }

    this.setWalletFetchingInterval();
    actions.checkForLoanAlerts();
  };

  componentDidUpdate(prevProps) {
    const { isFocused, appSettings } = this.props;

    if (prevProps.isFocused !== isFocused && isFocused === true) {
      this.setWalletFetchingInterval();
    }

    if (
      prevProps.appSettings.default_wallet_view !==
      appSettings.default_wallet_view
    ) {
      this.toggleView(appSettings.default_wallet_view);
    }

    // if (
    //   (prevProps.user && prevProps.user.first_name) !==
    //   (this.props.user && this.props.user.first_name)
    // ) {
    //   navigation.setParams({
    //     title: `Welcome ${this.props.user.first_name}!`
    //   })
    // }

    if (isFocused === false && this.walletFetchingInterval) {
      clearInterval(this.walletFetchingInterval);
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    clearInterval(this.walletFetchingInterval);
  }

  setWalletFetchingInterval = () => {
    const { actions } = this.props;

    this.walletFetchingInterval = setInterval(() => {
      actions.getWalletSummary();
    }, 300000);
  };

  handleBackButton = () => {};

  toggleView = viewType => {
    this.setState({ activeView: viewType });
  };

  refresh = async () => {
    const { actions } = this.props;
    this.setState({
      refreshing: true,
    });
    await actions.getWalletSummary();
    this.setState({
      refreshing: false,
    });
  };

  render() {
    const { activeView, refreshing } = this.state;
    const {
      actions,
      walletSummary,
      currenciesRates,
      currenciesGraphs,
      user,
      branchTransfer,
      depositCompliance,
      kycStatus,
    } = this.props;
    const style = WalletLandingStyle();

    if (!walletSummary || !currenciesRates || !currenciesGraphs || !user) {
      return <LoadingScreen />;
    }

    return (
      <RegularLayout refreshing={refreshing} pullToRefresh={this.refresh}>
        <KYCandPromotionsTrigger actions={actions} kycType={kycStatus} />
        <View>
          <MissingInfoCard user={user} navigateTo={actions.navigateTo} />
          <WalletDetailsCard
            walletSummary={walletSummary}
            navigateTo={actions.navigateTo}
            openModal={actions.openModal}
          />
          <View style={style.depositWrapper}>
            <CelText style={style.depositedCoins} weight="500">
              Deposited coins
            </CelText>
            <View style={style.buttonWrapper}>
              <TouchableOpacity
                onPress={() => this.toggleView(WALLET_LANDING_VIEW_TYPES.GRID)}
              >
                <Icon
                  style={{
                    opacity:
                      activeView === WALLET_LANDING_VIEW_TYPES.GRID ? 1 : 0.5,
                  }}
                  fill="primary"
                  name="GridView"
                  width="18"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={style.listView}
                onPress={() => this.toggleView(WALLET_LANDING_VIEW_TYPES.LIST)}
              >
                <Icon
                  style={{
                    opacity:
                      activeView === WALLET_LANDING_VIEW_TYPES.LIST ? 1 : 0.5,
                  }}
                  fill="primary"
                  name="ListView"
                  width="18"
                />
              </TouchableOpacity>
            </View>
          </View>
          <CoinCards
            activeView={activeView}
            navigateTo={actions.navigateTo}
            walletSummary={walletSummary}
            currenciesGraphs={currenciesGraphs}
            currenciesRates={currenciesRates}
            depositCompliance={depositCompliance}
          />
          <ExpandableItem heading={"COMING SOON"} margin={"10 0 10 0"}>
            <ComingSoonCoins activeView={activeView} />
          </ExpandableItem>
        </View>
        <CelPayReceivedModal transfer={branchTransfer} />
        <BecameCelMemberModal
          title={"Congrats! You have earned 1 CEL token!"}
        />
        <EarnInterestCelModal />
        <LoanAlertsModalWrapper />
      </RegularLayout>
    );
  }
}

export default withNavigationFocus(WalletLanding);
