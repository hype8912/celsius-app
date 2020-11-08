import React from "react";
import mock from 'react-native-permissions/mock';
import 'react-native-gesture-handler/jestSetup';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { NativeModules } from 'react-native'

configure({adapter: new Adapter()});


NativeModules.RNGoogleSignin = {
  SIGN_IN_CANCELLED: '0',
  IN_PROGRESS: '1',
  PLAY_SERVICES_NOT_AVAILABLE: '2',
  SIGN_IN_REQUIRED: '3'
}

// eslint-disable-next-line no-undef
const jestMock = jest.mock
// eslint-disable-next-line no-undef
const jestFunction = jest.fn()
// eslint-disable-next-line no-undef
const jestSpy = jest.spyOn

jestMock('react-native-permissions', () => {
  return mock;
});

// jest.mock('react-native-device-info', () => {
//   return{
//     deviceModel: "Iphone 6",
//     osVersion: "13.1",
//     os: "iOS",
//   };
// })

// jest.mock("react-native-appsflyer", () => {
//   return {
//     appsFlyerUID: "fdsdfboij24523423"
//   }
// })

jestMock("@react-native-community/netinfo", () => {
  return {
        getCurrentConnectivity: jestFunction,
        isConnectionMetered: jestFunction,
        addListener: jestFunction,
        removeListeners: jestFunction,

    isConnected: {
      fetch: () => {
        return Promise.resolve(true);
      },
            addEventListener: jestFunction,
            removeEventListener: jestFunction,
    },
  }
})

jestMock("@react-native-community/geolocation", () => {
  return {
        addListener: jestFunction,
        getCurrentPosition: jestFunction,
        removeListeners: jestFunction,
        requestAuthorization: jestFunction,
        setConfiguration: jestFunction,
        startObserving: jestFunction,
        stopObserving: jestFunction
  }
})

jestMock('react-navigation', () => ({
  withNavigationFocus: (Component) => (props) => (
        <Component navigation={{ navigate: jestFunction }} {...props} />
  ),
}))

jestMock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

jestMock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// jestMock('react-native-google-signin', () => {
//   const GoogleSigninButton = () => {}
//   GoogleSigninButton.Color = {
//     Auto: 0,
//     Light: 1,
//     Dark: 2
//   }
//   GoogleSigninButton.Size = {
//     Icon: 0,
//     Standard: 1,
//     Wide: 2
//   }
//
//   return GoogleSigninButton
// });

jestMock('react-native-branch', () => {
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


export { NativeModules, jestMock, jestFunction, jestSpy }
