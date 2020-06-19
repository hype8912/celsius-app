import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import store from "../../../app/redux/store";
import ACTIONS from "../../../app/constants/ACTIONS";

const ScreenStoryWrapper = ({ screen, screenName, state }) => {
  const navigatorProps = {
    initialRouteName: screenName,
  };
  const screens = { [screenName]: screen };
  const AppNavigator = createStackNavigator(screens, navigatorProps);
  const AppNavigation = createAppContainer(AppNavigator);

  store.dispatch({
    type: ACTIONS.SET_WHOLE_STATE,
    state,
  });

  return (
    <Provider store={store}>
      <AppNavigation>{screen}</AppNavigation>
    </Provider>
  );
};

export default ScreenStoryWrapper;
