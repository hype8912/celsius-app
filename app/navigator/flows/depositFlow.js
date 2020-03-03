import { createStackNavigator } from 'react-navigation'

import { defaultNavigationOptions, transitionConfig } from '../navigationConfig'
import Deposit from '../../components/screens/Deposit/Deposit'
import { profileFlow } from './profileFlow'

export const depositFlow = {
  screens: {
    Deposit,
    ...profileFlow.screens,
  },
  props: {
    initialRouteName: 'Deposit',
    defaultNavigationOptions,
    transitionConfig
  }
}

export const depositNavigator = createStackNavigator(depositFlow.screens, depositFlow.props);
