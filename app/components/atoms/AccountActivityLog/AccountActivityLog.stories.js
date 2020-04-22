import React from "react";

import StoryWrapper from "../StoryWrapper/StoryWrapper";
import AccountActivityLog from "./AccountActivityLog";

const logExample = [
  {ip: "188.2.52.220", country: "Serbia", city: "Ingija", platform: "android", date: "2020-04-14T11:38:03.732Z"},
  {ip: "188.2.52.220", country: "Serbia", city: "Ingija", platform: "android", date: "2020-04-14T11:38:03.147Z"},
  {ip: "188.2.52.220", country: "Serbia", city: "Ingija", platform: "android", date: "2020-04-14T11:36:49.200Z"},
]

const AccountActivityLogStories = () => (
  <StoryWrapper title="AccountActivityLog">
      <AccountActivityLog logData={logExample} />
  </StoryWrapper>
);

export default AccountActivityLogStories;
