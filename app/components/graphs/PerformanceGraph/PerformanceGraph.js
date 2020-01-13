import React from "react";
import {
  View,
  SafeAreaView,
  Animated,
  TextInput,
  Platform,
} from "react-native";
import PropTypes from "prop-types";

import Svg, { Path } from "react-native-svg";
import moment from "moment";
import * as path from "svg-path-properties";
import * as shape from "d3-shape";
import { scaleLinear, scaleTime } from "d3-scale";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import PerformanceGraphStyle from "./PerformanceGraph.styles";
import Separator from "../../atoms/Separator/Separator";
import formatter from "../../../utils/formatter";

const d3 = { shape };

class PerformanceGraph extends React.Component {
  static propTypes = {
    celStats: PropTypes.instanceOf(Array).isRequired, // y
    btcStats: PropTypes.instanceOf(Array).isRequired, // y
    ethStats: PropTypes.instanceOf(Array).isRequired, // y
    height: PropTypes.number,
    width: PropTypes.number,
    verticalPadding: PropTypes.number,
    labelWidth: PropTypes.number,
    cursorRadius: PropTypes.number,
  };

  static defaultProps = {
    height: heightPercentageToDP("20.21%"),
    width: widthPercentageToDP("88%"),
    verticalPadding: heightPercentageToDP("2%"),
    labelWidth: widthPercentageToDP("25%"),
    cursorRadius: heightPercentageToDP("1.06%"),
  };

  constructor(props) {
    super(props);

    this.state = {
      x: new Animated.Value(0),
    };

    this.cursor = {
      pointer: React.createRef(),
      dashedLine: React.createRef(),
      label: React.createRef(),
      labelText: React.createRef(),
      dateText: React.createRef(),
    };
    this.label = {
      btcPercent: React.createRef(),
      ethPercent: React.createRef(),
      celPercent: React.createRef(),
    };
  }

  componentDidMount() {
    this.moveCursor(0);
  }

  xDomain = [
    Math.min(
      ...this.props.celStats.map(c => c.x),
      ...this.props.btcStats.map(c => c.x),
      ...this.props.ethStats.map(c => c.x)
    ),
    Math.max(
      ...this.props.celStats.map(c => c.x),
      ...this.props.btcStats.map(c => c.x),
      ...this.props.ethStats.map(c => c.x)
    ),
  ];
  xRange = [0, this.props.width];
  yDomain = [
    Math.min(
      ...this.props.celStats.map(c => c.y),
      ...this.props.btcStats.map(c => c.y),
      ...this.props.ethStats.map(c => c.y)
    ),
    Math.max(
      ...this.props.celStats.map(c => c.y),
      ...this.props.btcStats.map(c => c.y),
      ...this.props.ethStats.map(c => c.y)
    ),
  ];
  yRange = [this.props.height, 0];
  scaleX = scaleTime()
    .domain(this.xDomain)
    .range(this.xRange);
  scaleY = scaleLinear()
    .domain(this.yDomain)
    .range(this.yRange);
  lineCEL = d3.shape
    .line()
    .x(d => this.scaleX(d.x))
    .y(d => this.scaleY(d.y))
    .curve(d3.shape.curveBasis)(this.props.celStats);
  lineETH = d3.shape
    .line()
    .x(d => this.scaleX(d.x))
    .y(d => this.scaleY(d.y))
    .curve(d3.shape.curveBasis)(this.props.ethStats);
  lineBTC = d3.shape
    .line()
    .x(d => this.scaleX(d.x))
    .y(d => this.scaleY(d.y))
    .curve(d3.shape.curveBasis)(this.props.btcStats);
  linePropertiesCel = path.svgPathProperties(this.lineCEL);
  lineLengthCel = this.linePropertiesCel.getTotalLength();
  linePropertiesEth = path.svgPathProperties(this.lineETH);
  lineLengthEth = this.linePropertiesEth.getTotalLength();
  linePropertiesBtc = path.svgPathProperties(this.lineBTC);
  lineLengthBtc = this.linePropertiesBtc.getTotalLength();

  moveCursor(value) {
    const { width, labelWidth } = this.props;
    const ratio = value / this.lineLengthCel;
    const { x, y } = this.linePropertiesCel.getPointAtLength(
      (1 - ratio) * this.lineLengthCel
    );
    const ethY = this.linePropertiesEth.getPointAtLength(
      (1 - ratio) * this.lineLengthEth
    ).y;
    const btcY = this.linePropertiesBtc.getPointAtLength(
      (1 - ratio) * this.lineLengthBtc
    ).y;
    const label = this.scaleX.invert(x);
    const cel = this.scaleY.invert(y);
    const eth = this.scaleY.invert(ethY);
    const btc = this.scaleY.invert(btcY);

    this.cursor.dashedLine.current.setNativeProps({
      top: 0,
      height: heightPercentageToDP("20%"),
      left: x,
    });
    const date = moment(label).format("MMM D, YYYY");
    this.cursor.labelText.current.setNativeProps({ text: `${date}` });

    if (x <= width / x + widthPercentageToDP("2%")) {
      this.cursor.label.current.setNativeProps({
        top: -heightPercentageToDP("3.5%"),
        left: x,
      });
    } else if (x >= width - widthPercentageToDP("5%")) {
      this.cursor.label.current.setNativeProps({
        top: -heightPercentageToDP("3.5%"),
        left: x - labelWidth,
      });
    } else {
      this.cursor.label.current.setNativeProps({
        top: -heightPercentageToDP("3.5%"),
        left: x - labelWidth / 2,
      });
    }

    this.label.celPercent.current.setNativeProps({
      text: `${formatter.percentage(cel)} %`,
    });
    this.label.ethPercent.current.setNativeProps({
      text: `${formatter.percentage(eth)} %`,
    });
    this.label.btcPercent.current.setNativeProps({
      text: `${formatter.percentage(btc)} %`,
    });
  }

  render() {
    const { x } = this.state;
    const styles = PerformanceGraphStyle();
    const currencies = ["cel", "eth", "btc"];

    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.container}>
          <Svg height={this.props.height} width={this.props.width}>
            <Path
              d={this.lineETH}
              stroke={STYLES.COLORS.GREEN}
              strokeWidth={1.5}
              fill="transparent"
            />
            <Path
              d={this.lineBTC}
              stroke={STYLES.COLORS.ORANGE}
              strokeWidth={1.5}
              fill="transparent"
            />
            <Path
              d={this.lineCEL}
              stroke={STYLES.COLORS.CELSIUS_BLUE}
              strokeWidth={1.5}
              fill="transparent"
            />
          </Svg>
          <View style={{ position: "absolute" }}>
            <View ref={this.cursor.label} style={[styles.pointer]}>
              <View style={[styles.label, styles.labelBackground]}>
                <TextInput
                  ref={this.cursor.labelText}
                  style={{
                    color: "white",
                    height: heightPercentageToDP("5.7%"),
                    fontSize: 12,
                    width: widthPercentageToDP("25.73%"),
                    textAlign: "center",
                  }} // TextInput issue- styles cannot override and need to be inline
                  editable={false}
                />
              </View>
            </View>
            <View ref={this.cursor.dashedLine}>
              <Separator
                opacity={1}
                color={styles.labelBoxBackgroundColor}
                size={1}
                vertical
              />
            </View>
          </View>
          <Animated.ScrollView
            style={styles.scrollPointer}
            contentContainerStyle={{ width: this.lineLengthCel * 2 }}
            bounces={false}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x } } }],
              {
                listener: event =>
                  this.moveCursor(event.nativeEvent.contentOffset.x),
              },
              { useNativeDriver: true }
            )}
            horizontal
          />
        </View>
        <View style={styles.percentageView}>
          {currencies.map(c => {
            let color;
            if (c === "cel") color = STYLES.COLORS.CELSIUS_BLUE;
            if (c === "btc") color = STYLES.COLORS.ORANGE;
            if (c === "eth") color = STYLES.COLORS.GREEN;
            return (
              <View key={c} style={styles.singlePercent}>
                <View
                  style={{
                    backgroundColor: color,
                    marginTop: widthPercentageToDP("1.8%"),
                    marginRight: 4,
                    height: widthPercentageToDP("1.6%"),
                    width: widthPercentageToDP("1.6%"),
                    borderRadius: widthPercentageToDP("1.6%") / 2,
                  }} // TextInput issue- styles cannot override and need to be inline
                />
                <View>
                  <View>
                    <View
                      style={
                        Platform.OS === "android"
                          ? { marginTop: -15 }
                          : { marginTop: 1 }
                      }
                    >
                      <TextInput style={{ color }} editable={false}>
                        {`${c.toUpperCase()} Change `}
                      </TextInput>
                    </View>
                    <View
                      style={
                        Platform.OS === "android"
                          ? { marginTop: -25 }
                          : { marginTop: 5 }
                      }
                    >
                      <TextInput
                        style={{ color }}
                        ref={this.label[`${c}Percent`]}
                        editable={false}
                      />
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </SafeAreaView>
    );
  }
}

export default PerformanceGraph;
