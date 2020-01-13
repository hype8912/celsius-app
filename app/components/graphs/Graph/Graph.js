import React from "react";
import { View, Animated, TextInput } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import moment from "moment";
import PropTypes from "prop-types";
import * as path from "svg-path-properties";
import * as shape from "d3-shape";
import { scaleLinear, scalePoint, scaleTime } from "d3-scale";

import formatter from "../../../utils/formatter";
import {
  getTheme,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import GraphStyle from "./Graph.styles";
import { THEMES } from "../../../constants/UI";
import STYLES from "../../../constants/STYLES";

// const { Path, Defs, LinearGradient, Stop } = Svg;
const d3 = { shape };

class Graph extends React.Component {
  static propTypes = {
    dateArray: PropTypes.instanceOf(Array).isRequired, // x
    priceArray: PropTypes.instanceOf(Array).isRequired, // y
    height: PropTypes.number,
    width: PropTypes.number,
    verticalPadding: PropTypes.number,
    labelWidth: PropTypes.number,
    cursorRadius: PropTypes.number,
    showCursor: PropTypes.bool,
    rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    interest: PropTypes.bool,
    backgroundColor: PropTypes.string,
    theme: PropTypes.oneOf(Object.values(THEMES)),
  };

  static defaultProps = {
    height: heightPercentageToDP("20.21%"),
    width: widthPercentageToDP("100%"),
    verticalPadding: heightPercentageToDP("2%"),
    labelWidth: widthPercentageToDP("20.33%"),
    cursorRadius: heightPercentageToDP("1.06%"),
    backgroundColor: "#F3F3F3",
  };

  constructor(props) {
    super(props);

    const { showCursor } = props;

    this.state = {
      loading: true,
      x: new Animated.Value(0),
    };

    this.cursor = showCursor
      ? {
          pointer: React.createRef(),
          dashedLine: React.createRef(),
          label: React.createRef(),
          labelText: React.createRef(),
          dateText: React.createRef(),
        }
      : {};
  }

  componentDidMount() {
    const { showCursor, type } = this.props;
    this.calculateLine();
    this.setState({ loading: false });

    if (showCursor)
      this.moveCursor(
        type === "total-balance" || type === "coin-balance" ? 10 : 0
      );
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.timeline !== this.props.timeline) {
      this.calculateLine();
      return true;
    }

    if (nextProps.theme !== this.props.theme) {
      return true;
    }

    return nextState.loading !== this.state.loading;
  };

  getColor = () => {
    const { interest, rate } = this.props;
    const areaColors = this.getGraphBackgroundColor();
    const theme = getTheme();

    let color = {
      line: STYLES.COLORS.CELSIUS_BLUE,
      area:
        theme === THEMES.DARK
          ? STYLES.COLORS.DARK_BACKGROUND
          : STYLES.COLORS.LIGHT_GRAY,
      back: STYLES.COLORS.CELSIUS_BLUE,
    };

    if (!interest) {
      color =
        rate >= 0
          ? {
              line: "#4FB895",
              area: areaColors.green,
              back: areaColors.back,
            }
          : {
              line: "#EF461A",
              area: areaColors.red,
              back: areaColors.back,
            };
    }

    return color;
  };

  getGraphBackgroundColor = () => {
    const theme = getTheme();

    switch (theme) {
      case THEMES.DARK:
        return {
          green: "#25454b",
          red: "#423439",
          back: STYLES.COLORS.DARK_BACKGROUND,
        };
      case THEMES.LIGHT:
        return {
          green: "#E5F5EF",
          red: "#FDE4DD",
          back: STYLES.COLORS.LIGHT_GRAY,
        };

      default:
        return {
          green: "#E5F5EF",
          red: "#FDE4DD",
          back: STYLES.COLORS.LIGHT_GRAY,
        };
    }
  };

  calculateLine() {
    const {
      width,
      height,
      verticalPadding,
      priceArray,
      dateArray,
      showCursor,
    } = this.props;
    // Domains and Ranges
    const yRange = [height - verticalPadding, verticalPadding];
    const yDomain = [Math.min(...priceArray), Math.max(...priceArray)];
    const xRange = [0, width];
    const xDomain = dateArray;
    const timeDomain = [Math.min(...dateArray), Math.max(...dateArray)];

    // creating Obj out of two arrays for line purposes
    const arrOfObjects = dateArray.map((x, i) => ({ x, y: priceArray[i] }));

    // Scaling and line making
    this.scaleX = scalePoint()
      .domain(xDomain)
      .range(xRange);
    this.scaleY = scaleLinear()
      .domain(yDomain)
      .range(yRange);
    this.scaleTime = scaleTime()
      .domain(timeDomain)
      .range(xRange);
    this.line = d3.shape
      .line()
      .x(d => this.scaleX(d.x))
      .y(d => this.scaleY(d.y))
      .curve(d3.shape.curveBasis)(arrOfObjects);
    this.lineProperties = path.svgPathProperties(this.line);
    this.lineLength = this.lineProperties.getTotalLength();
    if (showCursor) this.moveCursor(this.lineLength / 2);
  }

  moveCursor(value) {
    const {
      width,
      cursorRadius,
      labelWidth,
      showCursor,
      timeline,
      type,
    } = this.props;
    const { x, y } = this.lineProperties.getPointAtLength(
      this.lineLength - value
    );
    let tm;
    let timeStamp;

    switch (timeline) {
      case "1y":
        tm = "MMM YYYY";
        break;
      case "1d":
        tm = "kk";
        break;
      case "1m":
        tm = "D MMM";
        break;
      case "7d":
        tm = "dddd";
        break;
      default:
        tm = "1d";
    }

    if (type === "coin-interest") {
      timeStamp =
        !timeline || timeline === "1m"
          ? `${moment(this.scaleTime.invert(x)).format("D MMM")}`
          : moment(this.scaleTime.invert(x)).format("MMM YYYY");
    } else {
      timeStamp =
        !timeline || timeline === "1d"
          ? `${moment(this.scaleTime.invert(x)).format("kk")} h`
          : moment(this.scaleTime.invert(x)).format(tm);
    }

    const amount =
      this.scaleY.invert(y) < 0
        ? formatter.usd(this.scaleY.invert(y) * -1)
        : formatter.usd(this.scaleY.invert(y));

    if (showCursor) {
      this.cursor.pointer.current.setNativeProps({
        top: y - heightPercentageToDP("1.2%"),
        left: x - cursorRadius,
      });
      // this.cursor.dashedLine.current.setNativeProps({ top: y - heightPercentageToDP("1.2%"), height: height - y, left: x });
      this.cursor.labelText.current.setNativeProps({ text: amount });
      this.cursor.dateText.current.setNativeProps({ text: timeStamp });
      if (x <= width / x) {
        this.cursor.label.current.setNativeProps({
          top: y - heightPercentageToDP("7.2%"),
          left: x,
        });
      } else if (x >= width - widthPercentageToDP("5%")) {
        this.cursor.label.current.setNativeProps({
          top: y - heightPercentageToDP("7.2%"),
          left: x - labelWidth,
        });
      } else {
        this.cursor.label.current.setNativeProps({
          top: y - heightPercentageToDP("7.2%"),
          left: x - labelWidth / 2 - cursorRadius / 4,
        });
      }
    }
  }

  renderGraphSvg = () => {
    const { width, height, showCursor, type } = this.props;
    const { loading } = this.state;
    const color = this.getColor();
    const theme = getTheme();

    const strokeWidth = type === "coin-interest" ? 3 : 2;

    if (loading) {
      return null;
    }

    return (
      <Svg width={width} height={height}>
        <Defs>
          {type === "coin-interest" ? (
            <LinearGradient
              x1={"50%"}
              y1={"0%"}
              x2={"50%"}
              y2={"100%"}
              id={"gradient"}
            >
              <Stop
                stopColor={
                  theme === THEMES.DARK ? STYLES.COLORS.DARK_HEADER : "white"
                }
                offset={"100%"}
              />
            </LinearGradient>
          ) : null}

          {type === "total-balance" || type === "coin-balance" ? (
            <LinearGradient
              x1={"50%"}
              y1={"0%"}
              x2={"50%"}
              y2={"100%"}
              id={"gradient"}
            >
              <Stop stopColor={color.area} offset={"50%"} />
              <Stop stopColor={color.back} offset={"80%"} />
            </LinearGradient>
          ) : null}

          {type === "total-interest" ? (
            <LinearGradient
              x1={"50%"}
              y1={"0%"}
              x2={"50%"}
              y2={"100%"}
              id={"gradient"}
            >
              <Stop
                stopColor={theme === THEMES.DARK ? "#404d81" : "#d9e0f9"}
                offset={"50%"}
              />
              <Stop
                stopColor={
                  theme === THEMES.DARK
                    ? STYLES.COLORS.DARK_BACKGROUND
                    : STYLES.COLORS.LIGHT_GRAY
                }
                offset={"80%"}
              />
            </LinearGradient>
          ) : null}

          {!showCursor ? (
            <LinearGradient
              x1={"50%"}
              y1={"0%"}
              x2={"50%"}
              y2={"100%"}
              id={"gradient"}
            >
              <Stop stopColor={color.area} offset={"100%"} />
            </LinearGradient>
          ) : null}
        </Defs>
        <Path
          d={this.line}
          stroke={color.line}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Path
          d={`${this.line} L ${width} ${height} L 0 ${height}`}
          fill="url(#gradient)"
        />
      </Svg>
    );
  };

  renderPointer = () => {
    const color = this.getColor();
    const { showCursor } = this.props;
    const style = GraphStyle();

    return showCursor ? (
      <View style={{ position: "absolute" }}>
        <View ref={this.cursor.pointer}>
          <View
            style={[
              style.cursor,
              style.cursorBackgroundColor,
              { borderColor: color.line },
            ]}
          >
            <View style={[style.circle, { backgroundColor: color.line }]} />
          </View>
        </View>

        <View ref={this.cursor.label} style={[style.pointer]}>
          <View style={[style.label]}>
            <TextInput
              ref={this.cursor.labelText}
              style={{
                fontFamily: "Barlow-Regular",
                color: "white",
              }}
              editable={false}
            />
            <TextInput
              ref={this.cursor.dateText}
              style={{
                fontFamily: "Barlow-Regular",
                color: "white",
              }}
              editable={false}
            />
          </View>
          <View style={[style.triangle]} />
        </View>
      </View>
    ) : null;
  };

  renderScroll = () => {
    const { x, loading } = this.state;
    const { showCursor } = this.props;
    const style = GraphStyle();

    return showCursor && !loading ? (
      <Animated.ScrollView
        style={style.scrollPointer}
        contentContainerStyle={{ width: this.lineLength * 2 }}
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
    ) : null;
  };

  render() {
    const { style } = this.props;
    const GraphSvg = this.renderGraphSvg;
    const Scroll = this.renderScroll;
    const Pointer = this.renderPointer;

    return (
      <View style={style}>
        <GraphSvg />
        <Pointer />
        <Scroll />
      </View>
    );
  }
}

export default Graph;
