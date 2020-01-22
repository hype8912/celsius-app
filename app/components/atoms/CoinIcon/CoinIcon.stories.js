import React from "react";

import CoinIcon from "../CoinIcon/CoinIcon";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const CoinIconStories = () => (
  <StoryWrapper title="CoinIcon">
    <StoryWrapper title="Default state">
      <CoinIcon
        customStyles={{ width: 40, height: 40 }}
        url={"https://s2.coinmarketcap.com/static/img/coins/128x128/1.png"}
        coinShort={"BTC"}
      />
    </StoryWrapper>
  </StoryWrapper>
);

export default CoinIconStories;
