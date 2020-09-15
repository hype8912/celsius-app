import React from "react";
import _ from "lodash";

import SimplexScreen from "./SimplexScreen";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockBuyCoinsStore from "../../../../celsius-app-creds/mock-data/mockBuyCoinsStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  buyCoins: {
    simplexData: mockBuyCoinsStore.simplexData,
    paymentRequest: mockBuyCoinsStore.simplexData,
  },
};

const regular = () => {
  const state = _.cloneDeep(initialState);

  return (
    <ScreenStoryWrapper
      screenName="SimplexScreen"
      screen={SimplexScreen}
      state={state}
    />
  );
};

export default {
  regular,
};
