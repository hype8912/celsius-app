import React from "react";

import CelSegmentedControl from "./CelSegmentedControl";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const CelSegmentedControlStories = () => (
  <StoryWrapper title="CelSegmentedControl">
    <StoryWrapper title="Tax Report">
      <CelSegmentedControl
        width={214}
        height={42}
        options={[
          { name: "Email", image: "email" },
          { name: "Mail", image: "mail" },
        ]}
      />
    </StoryWrapper>
  </StoryWrapper>
);

export default CelSegmentedControlStories;
