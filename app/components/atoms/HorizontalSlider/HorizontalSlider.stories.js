import React from "react";

import HorizontalSlider from "../HorizontalSlider/HorizontalSlider";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const HorizontalSliderStories = () => (
  <StoryWrapper title="HorizontalSlider">
    <StoryWrapper title="Default state">
      <HorizontalSlider
        items={["Item 1", "Item 2", "Item 3", "Item 4"]}
        updateFormField={() => {}}
        onChange={() => {}}
        field={"fieldName"}
      />
    </StoryWrapper>
  </StoryWrapper>
);

export default HorizontalSliderStories;
