import React from "react";

import MissingInfoCard from "../MissingInfoCard/MissingInfoCard";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const user = {
  email: null,
};
const MissingInfoCardStories = () => (
  <StoryWrapper title="MissingInfoCard">
    <StoryWrapper title="Default state">
      <MissingInfoCard user={user} navigateTo={() => {}} />
    </StoryWrapper>
  </StoryWrapper>
);

export default MissingInfoCardStories;
