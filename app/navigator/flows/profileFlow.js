import { createStackNavigator } from 'react-navigation';
import Profile from '../../components/screens/Profile/Profile';
import Settings from "../../components/screens/Settings/Settings";
import TermsOfUse from "../../components/screens/TermsOfUse/TermsOfUse";
import Appearance from "../../components/screens/Appearance/Appearance";
import ApiAuthorizationPermissions from "../../components/screens/ApiAuthorizationPermissions/ApiAuthorizationPermissions";
import WalletSettings from "../../components/screens/WalletSettings/WalletSettings";
import SecuritySettings from "../../components/screens/SecuritySettings/SecuritySettings";
import SecurityOverview from "../../components/screens/SecurityOverview/SecurityOverview";
import NotificationsSettings from "../../components/screens/NotificationsSettings/NotificationsSettings";
import VerifyProfile from "../../components/screens/VerifyProfile/VerifyProfile";
import ChangePassword from "../../components/screens/ChangePassword/ChangePassword";
import ChangePin from "../../components/screens/ChangePin/ChangePin";
import TwoFactorSettings from "../../components/screens/TwoFactorSettings/TwoFactorSettings";
import ChangeAvatar from "../../components/screens/ChangeAvatar/ChangeAvatar";
import CameraScreen from "../../components/screens/CameraScreen/CameraScreen";
import ApiAuthorization from "../../components/screens/ApiAuthorization/ApiAuthorization";
import ConfirmCamera from "../../components/screens/ConfirmCamera/ConfirmCamera";
import { defaultNavigationOptions, transitionConfig } from '../navigationConfig';
import TwoFaAuthAppConfirmationCode from '../../components/screens/TwoFaAuthAppConfirmationCode/TwoFaAuthAppConfirmationCode'
import LoyaltyProgram from "../../components/screens/LoyaltyProgram/LoyaltyProgram";
import CellphoneEnter from "../../components/screens/CellphoneEnter/CellphoneEnter";
import CellphoneVerify from "../../components/screens/CellphoneVerify/CellphoneVerify";
import SelectCountry from "../../components/screens/SelectCountry/SelectCountry";
import WithdrawNewAddressSetup from "../../components/screens/WithdrawNewAddressSetup/WithdrawNewAddressSetup";
import WithdrawAddressOverview from "../../components/screens/WithdrawAddressOverview/WithdrawAddressOverview";
import WithdrawAddressLabel from "../../components/screens/WithdrawAddressLabel/WithdrawAddressLabel";


export const profileFlow = {
  screens: {
    Profile,
    Settings,
    TermsOfUse,
    NotificationsSettings,
    SecuritySettings,
    SecurityOverview,
    WalletSettings,
    ApiAuthorization,
    ApiAuthorizationPermissions,
    Appearance,
    VerifyProfile,
    ChangePassword,
    ChangePin,
    TwoFactorSettings,
    TwoFaAuthAppConfirmationCode,
    ChangeAvatar,
    CameraScreen,
    ConfirmCamera,
    LoyaltyProgram,
    CellphoneEnter,
    CellphoneVerify,
    SelectCountry,
    WithdrawNewAddressSetup,
    WithdrawAddressOverview,
    WithdrawAddressLabel
  },
  props: {
    initialRouteName: 'Profile',
    defaultNavigationOptions,
    transitionConfig
  }
}

export const profileNavigator = createStackNavigator(profileFlow.screens, profileFlow.props);
