import React from "react";

import StoryWrapper from "../StoryWrapper/StoryWrapper";
import UserActionsLog from "./UserActionsLog";

const logExample = [
  {action: "successful-login", created_at: "2020-04-10T17:11:05.923Z"},
  {action: "successful-login", created_at: "2020-04-10T16:53:45.730Z"},
  {action: "successful-login", created_at: "2020-04-10T16:53:42.556Z"}
]

const UserActionsLogStories = () => (
  <StoryWrapper title="UserActionsLog">
      <UserActionsLog logData={logExample} />
  </StoryWrapper>
);

export default UserActionsLogStories;
