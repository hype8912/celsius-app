import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { Image, View } from "react-native";
import { lookup } from "country-data";

import CelText from "../CelText/CelText";
import AccountActivityLogStyle from "./AccountActivityLog.styles";
import Separator from "../Separator/Separator";

const renderImage = (iso = "") => {
  if (!lookup.countries({ name: iso }) || !lookup.countries({ name: iso })[0])
    return null;
  const short = lookup.countries({ name: iso })[0].alpha2;
  return (
    <Image
      source={{
        uri: `https://raw.githubusercontent.com/hjnilsson/country-flags/master/png250px/${short.toLowerCase()}.png`,
      }}
      resizeMode="cover"
      style={{ borderRadius: 15, width: 30, height: 30 }}
    />
  );
};

const AccountActivityLog = props => {
  const { logData } = props;
  const style = AccountActivityLogStyle();
  return (
      <>
        <Separator margin="10 0 20 0" text="Account activity LOG" />
        {logData.map(item => (
          <View key={item.date} style={style.accountActionsLogWrapper}>
            <View style={style.accountActionsLog1}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {renderImage(item.country)}
                <View style={style.accountActionsLog2}>
                  <CelText hideFromRecording type="H5" weight="600">
                    {item.ip}{" "}
                  </CelText>
                  <CelText hideFromRecording type="H6" weight="300">
                    {item.country}{" "}
                  </CelText>
                </View>
              </View>
              <View style={style.accountActionsLog3}>
                <CelText type="H6" weight="300">
                  {item.platform === "ios" ? "iOS" : "Android"}{" "}
                </CelText>
                <CelText type="H6" weight="300">
                  {moment(item.date).format("MMMM D, GGGG")}
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

AccountActivityLog.propTypes = {
  logData: PropTypes.instanceOf(Array).isRequired
};

export default AccountActivityLog;
