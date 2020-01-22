import React from "react";

import Icon from "../Icon/Icon";
import StoryWrapper from "../StoryWrapper/StoryWrapper";
import STYLES from "../../../constants/STYLES";

const IconStories = () => (
  <StoryWrapper title="Icon">
    <StoryWrapper title="Default state">
      <Icon
        name={"Checked"}
        fill={STYLES.COLORS.GREEN}
        width={25}
        height={25}
      />
    </StoryWrapper>
    <StoryWrapper title="With Opacity">
      <Icon
        name={"Checked"}
        fill={STYLES.COLORS.GREEN}
        width={25}
        height={25}
        iconOpacity={0.2}
      />
    </StoryWrapper>
  </StoryWrapper>
);

export default IconStories;
