import React from "react";
import _ from "lodash";
import { View } from "react-native";
import { Provider } from "react-redux";
import { storiesOf } from "@storybook/react-native/dist";
import store from "../../redux/store";
import { openModal } from "../../redux/ui/uiActions";
import { MODALS, THEMES } from "../../constants/UI";
import CelButton from "../atoms/CelButton/CelButton";
import CenterView from "../../../storybook/stories/CenterView";
import LoanAlertsPayoutPrincipalModal from "./LoanAlertsModals/LoanAlertsPayoutPrincipalModal/LoanAlertsPayoutPrincipalModal";
import LoanAlertsDepositCoinsModal from "./LoanAlertsModals/LoanAlertsDepositCoinsModal/LoanAlertsDepositCoinsModal";
import LoanAlertsMarginCallLockCoinModal from "./LoanAlertsModals/LoanAlertsMarginCallLockCoinModal/LoanAlertsMarginCallLockCoinModal";

import ApiKeyRevokeModalStories from "./ApiKeyRevokeModal/ApiKeyRevokeModal.stories";
import ApiKeySuccessModalStories from "./ApiKeySuccessModal/ApiKeySuccessModal.stories";
import CalculateLoyaltyLevelModalStories from "./CalculateLoyaltyLevelModal/CalculateLoyaltyLevelModal.stories";
import CancelLoanModalStories from "./CancelLoanModal/CancelLoanModal.stories";
import CelPayReceivedModalStories from "./CelPayReceivedModal/CelPayReceivedModal.stories";
import ChangeWithdrawalAddressModalStories from "./ChangeWithdrawalAddressModal/ChangeWithdrawalAddressModal.stories";
import ConfirmWithdrawalAddressModalStories from "./ConfirmWithdrawalAddressModal/ConfirmWithdrawalAddressModal.stories";
import DepositInfoModalStories from "./DepositInfoModal/DepositInfoModal.stories";
import LoanApplicationSuccessModalStories from "./LoanApplicationSuccessModal/LoanApplicationSuccessModal.stories";
import LoseTierModalStories from "./LoseTierModal/LoseTierModal.stories";
import MemoIdModalStories from "./MemoIdModal/MemoIdModal.stories";
import PrepayDollarInterestModalStories from "./PrepayDollarInterestModal/PrepayDollarInterestModal.stories";
import PrepaymentSuccessfulModalStories from "./PrepaymentSuccessfulModal/PrepaymentSuccessfulModal.stories";
import ReferralSendModalStories from "./ReferralSendModal/ReferralSendModal.stories";
import RegisterPromoCodeModalStories from "./RegisterPromoCodeModal/RegisterPromoCodeModal.stories";
import RejectionReasonsModalStories from "./RejectionReasonsModal/RejectionReasonsModal.stories";
import SsnModalStories from "./SsnModal/SsnModal.stories";
import TransactionFilterModalStories from "./TransactionFilterModal/TransactionFilterModal.stories";
import WithdrawalInfoModalStories from "./WithdrawalInfoModal/WithdrawalInfoModal.stories";
import WithdrawWarningModalStories from "./WithdrawWarningModal/WithdrawWarningModal.stories";
import DestinationInfoTagModalStories from "./DestinationInfoTagModal/DestinationInfoTagModal.stories";
import InterestDueModalStories from "./InterestDueModal/InterestDueModal.stories";
import ReferralReceivedModalStories from "./ReferralReceivedModal/ReferralReceivedModal.stories";
import CelPayInfoModalStories from "./CelPayInfoModal/CelPayInfoModal.stories";
import ACTIONS from "../../constants/ACTIONS";
import GetCoinsConfirmModalStories from "./GetCoinsConfirmModal/GetCoinsConfirmModal.stories";

const changeTheme = () => {
  const currentState = _.cloneDeep(store.getState());

  const theme = currentState.user.appSettings.theme;
  let nextTheme;

  switch (theme) {
    case THEMES.LIGHT:
      nextTheme = THEMES.DARK;
      break;
    case THEMES.DARK:
      nextTheme = THEMES.UNICORN;
      break;
    case THEMES.UNICORN:
      nextTheme = THEMES.LIGHT;
      break;
  }

  currentState.user.appSettings.theme = nextTheme;

  store.dispatch({
    type: ACTIONS.SET_WHOLE_STATE,
    state: currentState,
  });
};

storiesOf("Modals", module)
  .addDecorator(getStory => (
    <Provider store={store}>
      <CenterView>{getStory()}</CenterView>
    </Provider>
  ))
  .add("All Modals", () => (
    <View>
      <CelButton onPress={changeTheme}>Change Theme</CelButton>

      <GetCoinsConfirmModalStories />
      <InterestDueModalStories />
      <CelPayReceivedModalStories />
      <ReferralReceivedModalStories />
      <DepositInfoModalStories />
      <LoanApplicationSuccessModalStories />
      <WithdrawalInfoModalStories />
      <ApiKeyRevokeModalStories />
      <ApiKeySuccessModalStories />
      <CalculateLoyaltyLevelModalStories />
      <CancelLoanModalStories />
      <ChangeWithdrawalAddressModalStories />
      <ConfirmWithdrawalAddressModalStories />
      <DestinationInfoTagModalStories />
      <DepositInfoModalStories />
      <LoanApplicationSuccessModalStories />
      <LoseTierModalStories />
      <MemoIdModalStories />
      <PrepayDollarInterestModalStories />
      <PrepaymentSuccessfulModalStories />
      <ReferralSendModalStories />
      <RegisterPromoCodeModalStories />
      <RejectionReasonsModalStories />
      <SsnModalStories />
      <TransactionFilterModalStories />
      <WithdrawWarningModalStories />
      <CelPayInfoModalStories />
    </View>
  ))
  .add("LoanAlertsPayoutPrincipalModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton
        onPress={() => store.dispatch(openModal(MODALS.LOAN_ALERT_MODAL))}
      >
        Open LoanAlertsPayoutPrincipalModal
      </CelButton>
      <LoanAlertsPayoutPrincipalModal />
    </View>
  ))
  .add("LoanAlertsDepositCoinsModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton
        onPress={() => store.dispatch(openModal(MODALS.LOAN_ALERT_MODAL))}
      >
        Open LoanAlertsDepositCoinsModal
      </CelButton>
      <LoanAlertsDepositCoinsModal />
    </View>
  ))
  .add("LoanAlertsMarginCallLockCoinModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton
        onPress={() => store.dispatch(openModal(MODALS.LOAN_ALERT_MODAL))}
      >
        Open LoanAlertsMarginCallLockCoinModal
      </CelButton>
      <LoanAlertsMarginCallLockCoinModal />
    </View>
  ));
