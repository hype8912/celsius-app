import React from "react";
import mock from 'react-native-permissions/mock';
import 'react-native-gesture-handler/jestSetup';

// eslint-disable-next-line no-undef
jest.mock('react-native-permissions', () => {
  return mock;
});
// eslint-disable-next-line no-undef
jest.mock('react-native-device-info', () => {
  return{
    deviceModel: "Iphone 6",
    osVersion: "13.1",
    os: "iOS",
  };
})

// eslint-disable-next-line no-undef
jest.mock("react-native-appsflyer", () => {
  return {
    appsFlyerUID: "fdsdfboij24523423"
  }
})

// eslint-disable-next-line no-undef
jest.mock("@react-native-community/netinfo", () => {
  return {
    // eslint-disable-next-line no-undef
    getCurrentConnectivity: jest.fn(),
    // eslint-disable-next-line no-undef
    isConnectionMetered: jest.fn(),
    // eslint-disable-next-line no-undef
    addListener: jest.fn(),
    // eslint-disable-next-line no-undef
    removeListeners: jest.fn(),
    // eslint-disable-next-line no-undef

    isConnected: {
      fetch: () => {
        return Promise.resolve(true);
      },
      // eslint-disable-next-line no-undef
      addEventListener: jest.fn(),
      // eslint-disable-next-line no-undef
      removeEventListener: jest.fn(),
    },
  }
})

// eslint-disable-next-line no-undef
jest.mock("@react-native-community/geolocation", () => {
  return {
    // eslint-disable-next-line no-undef
    addListener: jest.fn(),
    // eslint-disable-next-line no-undef
    getCurrentPosition: jest.fn(),
    // eslint-disable-next-line no-undef
    removeListeners: jest.fn(),
    // eslint-disable-next-line no-undef
    requestAuthorization: jest.fn(),
    // eslint-disable-next-line no-undef
    setConfiguration: jest.fn(),
    // eslint-disable-next-line no-undef
    startObserving: jest.fn(),
    // eslint-disable-next-line no-undef
    stopObserving: jest.fn()
  }
})

// eslint-disable-next-line no-undef
jest.mock('react-navigation', () => ({
  withNavigationFocus: (Component) => (props) => (
    // eslint-disable-next-line no-undef
    <Component navigation={{ navigate: jest.fn() }} {...props} />
  ),
}))

// eslint-disable-next-line no-undef
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// eslint-disable-next-line no-undef
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// eslint-disable-next-line no-undef
jest.mock('react-native-google-signin', () => {
  const GoogleSigninButton = () => {}
  GoogleSigninButton.Color = {
    Auto: 0,
    Light: 1,
    Dark: 2
  }
  GoogleSigninButton.Size = {
    Icon: 0,
    Standard: 1,
    Wide: 2
  }

  return GoogleSigninButton
});

// eslint-disable-next-line no-undef
jest.mock('react-native-branch', () => {
  return {
  ADD_TO_CART_EVENT: 'Add to Cart',
  ADD_TO_WISHLIST_EVENT: 'Add to Wishlist',
  PURCHASE_INITIATED_EVENT: 'Purchase Started',
  PURCHASED_EVENT: 'Purchased',
  REGISTER_VIEW_EVENT: 'View',
  SHARE_COMPLETED_EVENT: 'Share Completed',
  SHARE_INITIATED_EVENT: 'Share Started',

    subscribe: (cb) => { cb({params: {}, error: null}) }
    // and for createBranchUniversalObject, etc.
  }
});

