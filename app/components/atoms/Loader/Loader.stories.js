import React from "react";

import Loader from "../Loader/Loader";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const LoaderStories = () => (
  <StoryWrapper title="Loader">
    <StoryWrapper title="Default state">
      <Loader />
    </StoryWrapper>
  </StoryWrapper>
);

export default LoaderStories;
