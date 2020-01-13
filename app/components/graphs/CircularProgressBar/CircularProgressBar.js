import React, { Component } from "react";
import { View, ART } from "react-native";
import PropTypes from "prop-types";
import * as d3 from "d3";

import CircularProgressBarStyles from "./CircularProgressBar.styles";
import { heightPercentageToDP } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import CelText from "../../atoms/CelText/CelText";

const height = heightPercentageToDP("15%");

const { Surface, Group, Shape } = ART;

class CircularProgressBar extends Component {
  static propTypes = {
    amountPaid: PropTypes.number,
    amountLoaned: PropTypes.number,
  };
  static defaultProps = {
    amountPaid: 1,
    amountLoaned: 1,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const style = CircularProgressBarStyles();
    const { amountLoaned, amountPaid } = this.props;
    const percentage = (amountPaid * 100) / amountLoaned;
    const progress = [{ per: percentage }];
    const section = d3.pie().value(l => l.per)(progress)[0];

    const path = d3
      .arc()
      .startAngle(0)
      .endAngle((Math.PI * 2 * percentage) / 100)
      .outerRadius(height / 2.5) // must be less than 1/2 the chart's height/width
      .innerRadius(height / 2.3); // the size of the inner 'donut' whitespace

    return (
      <View>
        {amountLoaned !== 0 && (
          <View>
            <Surface width={height} height={height}>
              <Group x={height / 2} y={height / 2}>
                <Shape
                  d={path(section)}
                  stroke={STYLES.COLORS.GREEN}
                  fill={STYLES.COLORS.GREEN}
                  strokeWidth={4}
                />
              </Group>
            </Surface>

            <View
              style={[
                style.innerCircle,
                { backgroundColor: STYLES.COLORS.GREEN_OPACITY },
              ]}
            />
            <View style={[style.contentCircle, style.progressBackground]}>
              <CelText color={STYLES.COLORS.GRAY} type={"H6"} weight={"300"}>
                Amount
              </CelText>
              <CelText color={STYLES.COLORS.GREEN} type={"H3"} weight={"600"}>
                {amountPaid}
              </CelText>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default CircularProgressBar;
