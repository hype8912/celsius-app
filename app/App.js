// TODO(fj): init segment in app actions (removed from App.v2.js)
// TODO(fj): move handle app state change to app action (removed logic from App.v2.js)
// TODO(fj): move app loading assets to app action (removed logic from App.v2.js)
// TODO(fj): merge App and MainLayout?

// TODO(fj): create offline and no internet screens or a static screen with type?

import React, { Component } from "react";
// import { AppLoading } from "expo";
import { Provider } from "react-redux";
import { AppState, BackHandler, StyleSheet } from "react-native";
import SplashScreen from "react-native-splash-screen";
import codePush from "react-native-code-push";
import * as Font from "expo-font";
import store from "./redux/store";
import * as actions from "./redux/actions";
import AppNavigation from "./navigator/Navigator";
import Message from "./components/molecules/Message/Message";
import DeepLinkController from "./components/molecules/DeepLinkController/DeepLinkController";
import ErrorBoundary from "./ErrorBoundary";
import { remotePushController } from "./utils/push-notifications-util";
import FabIntersection from "./components/organisms/FabIntersection/FabIntersection";
import apiUtil from "./utils/api-util";

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

class App extends Component {
  async componentDidMount() {
    apiUtil.initInterceptors();

    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      store.dispatch(actions.navigateBack());
      return true;
    });
    AppState.addEventListener("change", nextState => {
      store.dispatch(actions.handleAppStateChange(nextState));
    });

    await store.dispatch(await actions.loadCelsiusAssets());
    StyleSheet.setStyleAttributePreprocessor(
      "fontFamily",
      Font.processFontFamily
    );
    SplashScreen.hide();
  }

  componentWillUnmount() {
    this.backHandler.remove();
    AppState.removeEventListener("change", nextState => {
      store.dispatch(actions.handleAppStateChange(nextState));
    });
  }

  render() {
    return (
      <ErrorBoundary>
        <CelsiusApplication />
      </ErrorBoundary>
    );
  }
}

const CelsiusApplication = () => (
  <Provider store={store}>
    <React.Fragment>
      <AppNavigation
        onNavigationStateChange={(prevState, currentState) => {
          const currentScreen = getActiveRouteName(currentState);
          const prevScreen = getActiveRouteName(prevState);

          if (prevScreen !== currentScreen) {
            store.dispatch(actions.setActiveScreen(currentScreen));
          }
        }}
        ref={navigatorRef => actions.setTopLevelNavigator(navigatorRef)}
      />
      <Message />
      <FabIntersection />
    </React.Fragment>
    <DeepLinkController />
    {remotePushController()}
  </Provider>
);

const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

export default codePush(codePushOptions)(App);
