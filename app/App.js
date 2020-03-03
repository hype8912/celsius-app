// TODO(fj): init segment in app actions (removed from App.v2.js)
// TODO(fj): move handle app state change to app action (removed logic from App.v2.js)
// TODO(fj): move app loading assets to app action (removed logic from App.v2.js)
// TODO(fj): merge App and MainLayout?

// TODO(fj): create offline and no internet screens or a static screen with type?

import React, { Component } from "react";
import { AppLoading } from "expo";
import { Provider } from "react-redux";
import { AppState, BackHandler } from "react-native";

import store from "./redux/store";
import * as actions from "./redux/actions";
import appUtil from "./utils/app-util";
import AppNavigation from "./navigator/Navigator";
import FabMenu from "./components/organisms/FabMenu/FabMenu";
import Message from "./components/molecules/Message/Message";
import captureException from "./utils/errorhandling-util";
import ErrorBoundary from "./ErrorBoundary";

appUtil.initializeThirdPartyServices();

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

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      store.dispatch(actions.navigateBack())
      return true
    });
    AppState.addEventListener("change", (nextState) => store.dispatch(actions.handleAppStateChange(nextState)));
  }

  componentWillUnmount() {
    this.backHandler.remove();
    AppState.removeEventListener("change",  (nextState) => store.dispatch(actions.handleAppStateChange(nextState)));
  }

  initApp = async () => await store.dispatch(await actions.loadCelsiusAssets());

  render() {
    const { isReady } = this.state;

    return (
      <ErrorBoundary>
        {!isReady ? (
          <AppLoading
            startAsync={this.initApp}
            onFinish={() => this.setState({ isReady: true })}
            onError={error => captureException(error)}
          />
        ) : (
          <CelsiusApplication/>
        )}
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
      <Message/>
      <FabMenu/>
    </React.Fragment>
  </Provider>
);


