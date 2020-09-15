import React from "react";
import _ from "lodash";

import CelPayChooseFriend from "./CelPayChooseFriend";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";
import mockContactsStore from "../../../../celsius-app-creds/mock-data/mockContactsStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  contacts: mockContactsStore,
  generalData: mockGeneralDataStore,
  forms: {
    formData: {
      search: "",
    },
  },
};

const regular = () => {
  const state = _.cloneDeep(initialState);

  state.contacts = [];

  return (
    <ScreenStoryWrapper
      screenName="CelPayChooseFriend"
      screen={CelPayChooseFriend}
      state={state}
    />
  );
};

const hasContacts = () => {
  const state = _.cloneDeep(initialState);

  return (
    <ScreenStoryWrapper
      screenName="CelPayChooseFriend"
      screen={CelPayChooseFriend}
      state={state}
    />
  );
};

const noContacts = () => {
  const state = _.cloneDeep(initialState);

  state.forms.formData.search = "test";

  return (
    <ScreenStoryWrapper
      screenName="CelPayChooseFriend"
      screen={CelPayChooseFriend}
      state={state}
    />
  );
};

export default {
  regular,
  hasContacts,
  noContacts,
};
