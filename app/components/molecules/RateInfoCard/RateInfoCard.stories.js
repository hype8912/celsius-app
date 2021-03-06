import React from "react";

import RateInfoCard from "../RateInfoCard/RateInfoCard";
import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";

const RateInfoCardStories = () => (
  <StoryWrapper title="RateInfoCard">
    <StoryWrapper title="Default state">
      <RateInfoCard />
    </StoryWrapper>
  </StoryWrapper>
);

export default RateInfoCardStories;
