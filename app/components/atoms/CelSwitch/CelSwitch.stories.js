import React from "react";

import CelSwitch from "../CelSwitch/CelSwitch";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const yes = true;
const no = false;
const CelSwitchStories = () => (
  <StoryWrapper title="CelSwitch">
    <StoryWrapper title="Switch On">
      <CelSwitch value={yes} onValueChange={() => {}} />
    </StoryWrapper>
    <StoryWrapper title="Switch Of">
      <CelSwitch value={no} onValueChange={() => {}} />
    </StoryWrapper>
  </StoryWrapper>
);

export default CelSwitchStories;
