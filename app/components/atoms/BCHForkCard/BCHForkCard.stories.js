import React from "react";

import BCHForkCard from "../BCHForkCard/BCHForkCard";
import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";

const BCHForkCardStories = () => (
  <StoryWrapper title="BCHForkCard">
    <StoryWrapper title="Default state">
      <BCHForkCard />
    </StoryWrapper>
  </StoryWrapper>
);

export default BCHForkCardStories;
