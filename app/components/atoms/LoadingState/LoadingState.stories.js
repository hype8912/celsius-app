import React from "react";

import LoadingState from "../LoadingState/LoadingState";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const LoadingStateStories = () => (
  <StoryWrapper title="LoadingState">
    <StoryWrapper title="Default state">
      <LoadingState />
    </StoryWrapper>
  </StoryWrapper>
);

export default LoadingStateStories;
