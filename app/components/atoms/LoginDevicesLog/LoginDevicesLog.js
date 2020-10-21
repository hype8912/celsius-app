import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { View } from "react-native";

import CelText from "../CelText/CelText";
import LoginDeviceStyle from "./LoginDevicesLog.styles";
import Separator from "../Separator/Separator";
import Icon from "../Icon/Icon";

const LoginDevicesLog = props => {
  const { logData } = props;
  const style = LoginDeviceStyle();

  return (
      <>
        <Separator margin="10 0 10 0" text="DEVICES Loged in" />
        {logData.map(item => (
          <View key={item.date} style={style.renderDeviceWrapper}>
            <View style={style.renderDevice}>
              <Icon name="Mobile" viewBox="0 0 29 29" fill="#737A82" />
              <View style={style.renderLeftSide}>
                <CelText hideFromRecording type="H5" weight="600">
                  {item.model}{" "}
                </CelText>
                <CelText hideFromRecording type="H6" weight="300">
                  {item.city}{item.city && ', '}{item.country}
                </CelText>
              </View>
              <View style={style.renderDeviceDate}>
                <CelText type="H6" weight="300">
                  {moment(item.date).fromNow()}
                </CelText>
              </View>
            </View>
            {logData[logData.length - 1] !== item ? (
              <Separator margin="15 0 10 0" />
            ) : null}
          </View>
        ))}
      </>
  )
};

LoginDevicesLog.propTypes = {
  logData: PropTypes.instanceOf(Array).isRequired
};

export default LoginDevicesLog;
