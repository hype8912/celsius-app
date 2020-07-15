import React from "react";

import TwoFaAuthAppConfirmationCode from "./TwoFaAuthAppConfirmationCode";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
    is2FAEnabled: mockUserStore.profile.postman13.two_factor_enabled,
  },
  forms: {
    formData: {
      pin: "2468",
    },
    formErrors: {},
  },
};

const regular = () => {
  return (
    <ScreenStoryWrapper
      screenName="TwoFaAuthAppConfirmationCode"
      screen={TwoFaAuthAppConfirmationCode}
      state={initialState}
    />
  );
};

export default {
  regular,
};
