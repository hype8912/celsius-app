import { createStackNavigator } from "react-navigation-stack";
import {
  defaultNavigationOptions,
  transitionConfig,
} from "../navigationConfig";
import WithdrawEnterAmount from "../../components/screens/WithdrawEnterAmount/WithdrawEnterAmount";
import WithdrawConfirmAddress from "../../components/screens/WithdrawConfirmAddress/WithdrawConfirmAddress";
import WithdrawConfirm from "../../components/screens/WithdrawConfirm/WithdrawConfirm";
import WithdrawCreateAddress from "../../components/screens/WithdrawCreateAddress/WithdrawCreateAddress";
import QRScanner from "../../components/screens/QRScanner/QRScanner";
import VerifyProfile from "../../components/screens/VerifyProfile/VerifyProfile";
import TransactionDetails from "../../components/screens/TransactionDetails/TransactionDetails";
import WithdrawNewAddressSetup from "../../components/screens/WithdrawNewAddressSetup/WithdrawNewAddressSetup";
import WithdrawAddressOverview from "../../components/screens/WithdrawAddressOverview/WithdrawAddressOverview";
import WithdrawAddressLabel from "../../components/screens/WithdrawAddressLabel/WithdrawAddressLabel";

export const withdrawFlow = {
  screens: {
    WithdrawEnterAmount,
    WithdrawCreateAddress,
    WithdrawConfirmAddress,
    WithdrawConfirm,
    TransactionDetails,
    QRScanner,
    VerifyProfile,
    WithdrawNewAddressSetup,
    WithdrawAddressOverview,
    WithdrawAddressLabel,
  },
  props: {
    initialRouteName: "WithdrawEnterAmount",
    defaultNavigationOptions,
    transitionConfig,
  },
};

export const withdrawNavigator = createStackNavigator(
  withdrawFlow.screens,
  withdrawFlow.props
);
