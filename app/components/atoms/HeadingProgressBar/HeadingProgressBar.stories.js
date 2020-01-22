import React from "react";

import HeadingProgressBar from "../HeadingProgressBar/HeadingProgressBar";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const HeadingProgressBarStories = () => (
  <StoryWrapper title="HeadingProgressBar">
    <StoryWrapper title="Default state">
      <HeadingProgressBar steps={5} currentStep={2} />
    </StoryWrapper>
  </StoryWrapper>
);

export default HeadingProgressBarStories;
