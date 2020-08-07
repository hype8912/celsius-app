import React from "react";
import _ from "lodash";

import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import GetCoinsTransactionDetails from "./GetCoinsTransactionDetails";
import mockBuyCoinsStore from "../../../../celsius-app-creds/mock-data/mockBuyCoinsStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  buyCoins: {
    payments: mockBuyCoinsStore.payments.postman13,
  },
};

const paymentStory = (type, status) => {
  const state = _.cloneDeep(initialState);
  const payment = initialState.buyCoins.payments.find(
    p => p.type === type && p.status === status
  );
  const navigationProps = {
    id: payment.id,
  };
  return (
    <ScreenStoryWrapper
      screenName="GetCoinsTransactionDetails"
      screen={GetCoinsTransactionDetails}
      state={state}
      navigationProps={navigationProps}
    />
  );
};

export default {
  wirePending: () => paymentStory("bank_wire", "pending"),
  wireConfirmed: () => paymentStory("bank_wire", "completed"),
  wireCancelled: () => paymentStory("bank_wire", "expired"),
  cardPending: () => paymentStory("credit_card", "pending"),
  cardConfirmed: () => paymentStory("credit_card", "approved"),
  cardCancelled: () => paymentStory("credit_card", "declined"),
};
