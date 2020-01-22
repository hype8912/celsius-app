import React from "react";

import ProgressBar from "../ProgressBar/ProgressBar";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const ProgressBarStories = () => (
  <StoryWrapper title="ProgressBar">
    <StoryWrapper title="Default state">
      <ProgressBar steps={5} currentStep={3} />
    </StoryWrapper>
  </StoryWrapper>
);

export default ProgressBarStories;
