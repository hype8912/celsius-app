import React from "react";

import OfflineMode from "../OfflineMode/OfflineMode";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const OfflineModeStories = () => (
  <StoryWrapper title="OfflineMode">
    <StoryWrapper title="Default state">
      <OfflineMode />
    </StoryWrapper>
  </StoryWrapper>
);

export default OfflineModeStories;
