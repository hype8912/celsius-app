import { createStackNavigator } from "react-navigation-stack";

import {
  defaultNavigationOptions,
  transitionConfig,
} from "../navigationConfig";
import Deposit from "../../components/screens/Deposit/Deposit";
import SelectCoin from "../../components/screens/SelectCoin/SelectCoin";
import { profileFlow } from "./profileFlow";

export const depositFlow = {
  screens: {
    Deposit,
    SelectCoin,
    ...profileFlow.screens,
  },
  props: {
    initialRouteName: "Deposit",
    defaultNavigationOptions,
    transitionConfig,
  },
};

export const depositNavigator = createStackNavigator(
  depositFlow.screens,
  depositFlow.props
);
