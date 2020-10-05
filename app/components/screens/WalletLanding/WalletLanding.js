import React, { Component } from "react";
import { View, TouchableOpacity, BackHandler } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNavigationFocus } from "react-navigation";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import WalletDetailsCard from "../../organisms/WalletDetailsCard/WalletDetailsCard";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Icon from "../../atoms/Icon/Icon";
import CelPayReceivedModal from "../../modals/CelPayReceivedModal/CelPayReceivedModal";
import {
  MODALS,
  THEMES,
  WALLET_LANDING_VIEW_TYPES,
} from "../../../constants/UI";
import MissingInfoCard from "../../atoms/MissingInfoCard/MissingInfoCard";
import ComingSoonCoins from "../../molecules/ComingSoonCoins/ComingSoonCoins";
import CoinCards from "../../organisms/CoinCards/CoinCards";
import WalletLandingStyle from "./WalletLanding.styles";
import ExpandableItem from "../../molecules/ExpandableItem/ExpandableItem";
import ReferralSendModal from "../../modals/ReferralSendModal/ReferralSendModal";
import RejectionReasonsModal from "../../modals/RejectionReasonsModal/RejectionReasonsModal";
import LoanAlertsModalWrapper from "../../modals/LoanAlertsModals/LoanAlertsModalWrapper";
import BannerCrossroad from "../../organisms/BannerCrossroad/BannerCrossroad";
import CelButton from "../../atoms/CelButton/CelButton";
import { assignPushNotificationToken } from "../../../utils/push-notifications-util";
import HodlModeModal from "../../modals/HodlModeModal/HodlModeModal";
import animationsUtil from "../../../utils/animations-util";
import { STORAGE_KEYS, COMING_SOON_COINS } from "../../../constants/DATA";
import IntroduceNewThemeModal from "../../modals/IntroduceNewThemeModal/IntroduceNewThemeModal";
import { getTheme } from "../../../utils/styles-util";
import { SCREENS } from "../../../constants/SCREENS";
import { getSecureStoreKey } from "../../../utils/storage-util";

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
      depositCompliance: state.compliance.deposit,
      rejectionReasons: state.user.profile.kyc
        ? state.user.profile.kyc.rejectionReasons
        : [],
      previouslyOpenedModals: state.ui.previouslyOpenedModals,
      hodlStatus: state.hodl.hodlStatus,
      userTriggeredActions: state.user.appSettings.user_triggered_actions || {},
      shouldAnimate: state.ui.shouldAnimate,
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
      gesturesEnabled: false,
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
    };
  }

  componentDidMount = async () => {
    const {
      actions,
      currenciesRates,
      currenciesGraphs,
      previouslyOpenedModals,
      hodlStatus,
    } = this.props;
    actions.changeWalletHeaderContent();

    actions.getWalletSummary();
    if (!currenciesRates) actions.getCurrencyRates();
    if (!currenciesGraphs) actions.getCurrencyGraphs();
    actions.getLoyaltyInfo();
    actions.getLoanAlerts();
    this.setWalletFetchingInterval();

    const dontShowIntroduceNewTheme = await getSecureStoreKey(
      STORAGE_KEYS.DONT_SHOW_INTRODUCE_NEW_THEME
    );
    setTimeout(() => {
      if (
        dontShowIntroduceNewTheme !== "DONT_SHOW" &&
        getTheme() !== THEMES.UNICORN
      ) {
        actions.openModal(MODALS.INTRODUCE_NEW_THEME_MODAL);
      } else if (
        !previouslyOpenedModals.HODL_MODE_MODAL &&
        hodlStatus.created_by === "backoffice"
      ) {
        actions.openModal(MODALS.HODL_MODE_MODAL);
      }
    }, 2000);

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    await assignPushNotificationToken();
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

  pendingAddresses = () => {
    const { walletSummary } = this.props;

    const pendingAddresses =
      walletSummary &&
      walletSummary.coins.filter(
        coin => coin.has_pending_deposit_address_change
      );

    return pendingAddresses || [];
  };

  handleBackButton = () => {};

  toggleView = viewType => {
    this.setState({ activeView: viewType });
  };

  renderComingSoon() {
    const { activeView } = this.state;
    const { shouldAnimate } = this.props;
    const style = WalletLandingStyle();
    const isGrid = activeView === WALLET_LANDING_VIEW_TYPES.GRID;
    const processedItems = animationsUtil.applyOffset(
      COMING_SOON_COINS,
      isGrid ? 2 : 1
    );

    return (
      <View
        style={[
          style.flexWrapper,
          { flexDirection: isGrid ? "row" : "column" },
        ]}
      >
        {processedItems.map(coin => (
          <ComingSoonCoins
            key={coin.name}
            coin={coin}
            offset={processedItems.offset}
            isGrid={isGrid}
            shouldAnimate={shouldAnimate}
            activeView={activeView}
          />
        ))}
      </View>
    );
  }

  render() {
    const { activeView } = this.state;
    const {
      actions,
      walletSummary,
      currenciesRates,
      currenciesGraphs,
      user,
      branchTransfer,
      depositCompliance,
      rejectionReasons,
      shouldAnimate,
    } = this.props;
    const style = WalletLandingStyle();

    if (!walletSummary || !user || !currenciesRates) {
      return <LoadingScreen fabType="hide" />;
    }
    return (
      <RegularLayout
        pullToRefresh={() => actions.getWalletSummary()}
        fabType={currenciesRates ? "main" : "hide"}
      >
        <BannerCrossroad />
        <View>
          <MissingInfoCard user={user} navigateTo={actions.navigateTo} />
          <WalletDetailsCard
            walletSummary={walletSummary}
            navigateTo={actions.navigateTo}
            openModal={actions.openModal}
          />
          <View style={style.depositWrapper}>
            <View>
              <CelButton
                onPress={() => actions.navigateTo(SCREENS.GET_COINS_LANDING)}
                style={{ alignSelf: "flex-start" }}
                margin="10 0 2 0"
                size="small"
                iconRight="IconArrowRight"
                iconRightWidth={18}
                iconRightHeight={18}
              >
                Buy Coins
              </CelButton>
            </View>

            <View style={style.buttonWrapper}>
              <TouchableOpacity
                onPress={() => this.toggleView(WALLET_LANDING_VIEW_TYPES.GRID)}
              >
                <Icon
                  fill={
                    activeView === WALLET_LANDING_VIEW_TYPES.GRID
                      ? "active"
                      : "inactive"
                  }
                  name="GridView"
                  width="18"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={style.listView}
                onPress={() => this.toggleView(WALLET_LANDING_VIEW_TYPES.LIST)}
              >
                <Icon
                  fill={
                    activeView === WALLET_LANDING_VIEW_TYPES.LIST
                      ? "active"
                      : "inactive"
                  }
                  name="ListView"
                  width="18"
                />
              </TouchableOpacity>
            </View>
          </View>
          <CoinCards
            shouldAnimate={shouldAnimate}
            activeView={activeView}
            navigateTo={actions.navigateTo}
            walletSummary={walletSummary}
            currenciesGraphs={currenciesGraphs}
            currenciesRates={currenciesRates}
            depositCompliance={depositCompliance}
          />
          <ExpandableItem heading={"COMING SOON"} margin={"10 0 10 0"}>
            {this.renderComingSoon()}
          </ExpandableItem>
        </View>
        <CelPayReceivedModal transfer={branchTransfer} />
        <ReferralSendModal />
        <RejectionReasonsModal rejectionReasons={rejectionReasons} />
        <HodlModeModal />
        <LoanAlertsModalWrapper />
        <IntroduceNewThemeModal />
      </RegularLayout>
    );
  }
}

export default withNavigationFocus(WalletLanding);
