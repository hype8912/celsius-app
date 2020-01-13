import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Home from "../components/screens/Home/Home";
import Community from "../components/screens/Community/Community";

import { INITIAL_ROUTE } from "../constants/UI";
import { borrowNavigator } from "./flows/borrowFlow";
import { defaultNavigationOptions, transitionConfig } from "./navigationConfig";
import { celPayNavigator } from "./flows/celPayFlow";
import { walletNavigator } from "./flows/walletFlow";
import { profileNavigator } from "./flows/profileFlow";
import { authNavigator } from "./flows/authFlow";
import { kycNavigator } from "./flows/kycFlow";
import { depositNavigator } from "./flows/depositFlow";
import Maintenance from "../components/screens/Maintenance/Maintenance";

export const communityNavigator = createStackNavigator(
  { Community },
  {
    defaultNavigationOptions,
    transitionConfig,
  }
);

export const screens = {
  Home,
  Maintenance,
  Auth: authNavigator,
  KYC: kycNavigator,
  WalletFab: walletNavigator,
  DepositFab: depositNavigator,
  BorrowFab: borrowNavigator,
  CelPayFab: celPayNavigator,
  ProfileFab: profileNavigator,
  CommunityFab: communityNavigator,
};

const navigatorProps = {
  initialRouteName: INITIAL_ROUTE,
  transitionConfig,
  defaultNavigationOptions,
};

const AppNavigator = createSwitchNavigator(screens, navigatorProps);

export default createAppContainer(AppNavigator);
