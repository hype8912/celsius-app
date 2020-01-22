import React from "react";

import BadgeSelector from "../BadgeSelector/BadgeSelector";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const BadgeSelectorStories = () => (
  <StoryWrapper title="BadgeSelector">
    <StoryWrapper title="Default state">
      <BadgeSelector badges={["BTC", "ETH", "CEL"]} onPressBadge={() => {}} />
    </StoryWrapper>
  </StoryWrapper>
);

export default BadgeSelectorStories;
