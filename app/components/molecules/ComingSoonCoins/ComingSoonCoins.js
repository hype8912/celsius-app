import React from "react";
import PropTypes from "prop-types";
import { Image, Linking, View } from "react-native";

import ComingSoonCoinsStyle from "./ComingSoonCoins.styles";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";
import { THEMES, WALLET_LANDING_VIEW_TYPES } from "../../../constants/UI";
import Icon from "../../atoms/Icon/Icon";
import { getTheme } from "../../../utils/styles-util";

const COMING_SOON_COINS = [
  {
    name: "Algorand",
    short: "ALGO",
    image_url: require("../../../../assets/images/coins/algorand.png"),
    learn_more_link: "https://www.algorand.com/",
  },
  {
    name: "Tron",
    short: "TRX",
    image_url: require("../../../../assets/images/coins/tron3x.png"),
    learn_more_link: "https://tron.network/",
  },
  {
    name: "PAX Gold",
    short: "PAXG",
    image_url: require("../../../../assets/images/coins/paxGoldFullColor3x.png"),
    learn_more_link: "https://www.paxos.com/paxgold/",
  },
];

const ComingSoonCoins = props => {
  const style = ComingSoonCoinsStyle(props.theme);
  const { activeView } = props;
  const isGrid = activeView === WALLET_LANDING_VIEW_TYPES.GRID;
  const cardSize =
    activeView === WALLET_LANDING_VIEW_TYPES.GRID ? "half" : "full";
  const textSize = activeView === WALLET_LANDING_VIEW_TYPES.GRID ? "H4" : "H3";
  const theme = getTheme();
  return (
    <View style={style.container}>
      <View style={style.flexWrapper}>
        {COMING_SOON_COINS.map(csc => (
          <Card size={cardSize} key={csc.short}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {theme === THEMES.DARK ? (
                  <Icon
                    name={`Icon${csc.short}`}
                    width="40"
                    height="40"
                    fill={STYLES.COLORS.MEDIUM_GRAY}
                    style={{ marginRight: 12 }}
                  />
                ) : (
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      marginRight: 12,
                    }}
                    resizeMode="contain"
                    source={csc.image_url}
                  />
                )}
                <View>
                  <CelText weight="300" type="H6">
                    {csc.short}
                  </CelText>
                  <CelText type={textSize}>{csc.name}</CelText>

                  {isGrid && (
                    <CelText
                      color={STYLES.COLORS.CELSIUS_BLUE}
                      type="H6"
                      onPress={() => Linking.openURL(csc.learn_more_link)}
                    >
                      Learn more
                    </CelText>
                  )}
                </View>
              </View>

              {!isGrid && (
                <CelText
                  color={STYLES.COLORS.CELSIUS_BLUE}
                  onPress={() => Linking.openURL(csc.learn_more_link)}
                >
                  Learn more
                </CelText>
              )}
            </View>
          </Card>
        ))}
      </View>
    </View>
  );
};

ComingSoonCoins.propTypes = {
  activeView: PropTypes.oneOf(Object.values(WALLET_LANDING_VIEW_TYPES)),
};

export default ComingSoonCoins;
