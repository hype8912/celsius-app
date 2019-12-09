import { createStackNavigator } from "react-navigation";

import {
  defaultNavigationOptions,
  transitionConfig,
} from "../navigationConfig";
import TransactionsOnHold from "../../components/screens/TransactionsOnHold/TransactionsOnHold";
import TransactionDetails from "../../components/screens/TransactionDetails/TransactionDetails";
import KYCProfileDetails from "../../components/screens/KYCProfileDetails/KYCProfileDetails";
import KYCAddressInfo from "../../components/screens/KYCAddressInfo/KYCAddressInfo";
import KYCTaxpayer from "../../components/screens/KYCTaxpayer/KYCTaxpayer";
import KYCVerifyIdentity from "../../components/screens/KYCVerifyIdentity/KYCVerifyIdentity";
import KYCCheckPhotos from "../../components/screens/KYCCheckPhotos/KYCCheckPhotos";
import KYCAddressProof from "../../components/screens/KYCAddressProof/KYCAddressProof";
import KYCPrimeTrustToU from "../../components/screens/KYCPrimeTrustToU/KYCPrimeTrustToU";
import KYCFinalRejection from "../../components/screens/KYCFinalRejection/KYCFinalRejection";
import { profileFlow } from "./profileFlow";
import { walletFlow } from "./walletFlow";

const kycFlow = {
  screens: {
    TransactionsOnHold,
    TransactionDetails,
    KYCProfileDetails,
    KYCAddressInfo,
    KYCTaxpayer,
    KYCVerifyIdentity,
    KYCAddressProof,
    KYCCheckPhotos,
    KYCPrimeTrustToU,
    KYCFinalRejection,
    ...profileFlow.screens,
    ...walletFlow.screens,
  },
  props: {
    initialRouteName: "KYCProfileDetails",
    defaultNavigationOptions: {
      ...defaultNavigationOptions,
      headerSameColor: false,
    },
    transitionConfig,
  },
};

export const kycNavigator = createStackNavigator(
  kycFlow.screens,
  kycFlow.props
);
