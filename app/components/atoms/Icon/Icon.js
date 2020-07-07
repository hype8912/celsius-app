import React, { Component } from "react";
import SvgIcon from "react-native-svg-icon";
import PropTypes from "prop-types";
import { View, Image } from "react-native";

import Svgs from "../../../constants/SVGS";
import CommonSvgs from "../../../constants/UnicornSvgs/CommonSvgs";
import { getTheme } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import { THEMES } from "../../../constants/UI";
import { UNICORN_ICONS } from "../../../constants/DATA";
import IconStyle from "./Icon.styles";

const iconColors = {
  primary: {
    [THEMES.LIGHT]: STYLES.COLORS.MEDIUM_GRAY,
    [THEMES.DARK]: STYLES.COLORS.WHITE_OPACITY5,
  },
};

class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    fill: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    iconOpacity: PropTypes.number,
  };
  static defaultProps = {
    fill: "#000",
    width: 40,
    height: 40,
    iconOpacity: 1,
  };

  renderPngIcon = name => {
    const iconStyle = IconStyle();
    const { height, width } = this.props;

    const pngIcons = {
      Ape: require(`../../../../assets/images/unicorn-icons/Ape.png`),
      Appearance: require(`../../../../assets/images/unicorn-icons/Appearance.png`),
      Average: require(`../../../../assets/images/unicorn-icons/Average.png`),
      Borrow: require(`../../../../assets/images/unicorn-icons/Borrow.png`),
      CelPay: require(`../../../../assets/images/unicorn-icons/CelPay.png`),
      Celsius: require(`../../../../assets/images/unicorn-icons/Celsius.png`),
      CheckCircle: require(`../../../../assets/images/unicorn-icons/CheckCircle.png`),
      CirclePlus: require(`../../../../assets/images/unicorn-icons/CirclePlus.png`),
      CloseCircle: require(`../../../../assets/images/unicorn-icons/CloseCircle.png`),
      Community: require(`../../../../assets/images/unicorn-icons/Community.png`),
      Contacts: require(`../../../../assets/images/unicorn-icons/Contacts.png`),
      Couple: require(`../../../../assets/images/unicorn-icons/Couple.png`),
      Deposit: require(`../../../../assets/images/unicorn-icons/Deposit.png`),
      DrivingLicense: require(`../../../../assets/images/unicorn-icons/DrivingLicense.png`),
      Earned: require(`../../../../assets/images/unicorn-icons/Earned.png`),
      EyeHide: require(`../../../../assets/images/unicorn-icons/EyeHide.png`),
      EyeShow: require(`../../../../assets/images/unicorn-icons/EyeShow.png`),
      Filter: require(`../../../../assets/images/unicorn-icons/Filter.png`),
      GreenCheck: require(`../../../../assets/images/unicorn-icons/GreenCheck.png`),
      GridView: require(`../../../../assets/images/unicorn-icons/GridView.png`),
      IDCard: require(`../../../../assets/images/unicorn-icons/IDCard.png`),
      Info: require(`../../../../assets/images/unicorn-icons/Info.png`),
      InfoCircle: require(`../../../../assets/images/unicorn-icons/InfoCircle.png`),
      Key: require(`../../../../assets/images/unicorn-icons/Key.png`),
      ListView: require(`../../../../assets/images/unicorn-icons/ListView.png`),
      Loan: require(`../../../../assets/images/unicorn-icons/Loan.png`),
      Loans: require(`../../../../assets/images/unicorn-icons/Loans.png`),
      Lock: require(`../../../../assets/images/unicorn-icons/Lock.png`),
      Mail: require(`../../../../assets/images/unicorn-icons/Mail.png`),
      Mobile: require(`../../../../assets/images/unicorn-icons/Mobile.png`),
      MyCel: require(`../../../../assets/images/unicorn-icons/MyCel.png`),
      NewWindowIcon: require(`../../../../assets/images/unicorn-icons/NewWindowIcon.png`),
      NotSecure: require(`../../../../assets/images/unicorn-icons/NotSecure.png`),
      Notifications: require(`../../../../assets/images/unicorn-icons/Notifications.png`),
      Passport: require(`../../../../assets/images/unicorn-icons/Passport.png`),
      PiggyBank: require(`../../../../assets/images/unicorn-icons/PiggyBank.png`),
      Profile: require(`../../../../assets/images/unicorn-icons/Profile.png`),
      Rates: require(`../../../../assets/images/unicorn-icons/Rates.png`),
      ReceiveArrowTransactions: require(`../../../../assets/images/unicorn-icons/ReceiveArrowTransactions.png`),
      Refer: require(`../../../../assets/images/unicorn-icons/Refer.png`),
      Search: require(`../../../../assets/images/unicorn-icons/Search.png`),
      Security: require(`../../../../assets/images/unicorn-icons/Security.png`),
      Sent: require(`../../../../assets/images/unicorn-icons/Sent.png`),
      Settings: require(`../../../../assets/images/unicorn-icons/Settings.png`),
      Shield: require(`../../../../assets/images/unicorn-icons/Shield.png`),
      StackedCoins: require(`../../../../assets/images/unicorn-icons/StackedCoins.png`),
      Support: require(`../../../../assets/images/unicorn-icons/Support.png`),
      Switch: require(`../../../../assets/images/unicorn-icons/Switch.png`),
      Total: require(`../../../../assets/images/unicorn-icons/Total.png`),
      TransactionCC: require(`../../../../assets/images/unicorn-icons/TransactionCC.png`),
      TransactionCancelled: require(`../../../../assets/images/unicorn-icons/TransactionCancelled.png`),
      TransactionCelsius: require(`../../../../assets/images/unicorn-icons/TransactionCelsius.png`),
      TransactionInterest: require(`../../../../assets/images/unicorn-icons/TransactionInterest.png`),
      TransactionLoan: require(`../../../../assets/images/unicorn-icons/TransactionLoan.png`),
      TransactionLocked: require(`../../../../assets/images/unicorn-icons/TransactionLocked.png`),
      TransactionReceived: require(`../../../../assets/images/unicorn-icons/TransactionReceived.png`),
      TransactionSent: require(`../../../../assets/images/unicorn-icons/TransactionSent.png`),
      Transactions: require(`../../../../assets/images/unicorn-icons/Transactions.png`),
      UtilityBill: require(`../../../../assets/images/unicorn-icons/UtilityBill.png`),
      Wallet: require(`../../../../assets/images/unicorn-icons/Wallet.png`),
      WalletSettings: require(`../../../../assets/images/unicorn-icons/WalletSettings.png`),
      WarningCircle: require(`../../../../assets/images/unicorn-icons/WarningCircle.png`),
      Withdraw: require(`../../../../assets/images/unicorn-icons/Withdraw.png`),
    };

    switch (name) {
      case "Ape":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Ape}
          />
        );
      case "Appearance":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Appearance}
          />
        );
      case "Average":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Average}
          />
        );
      case "Borrow":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Borrow}
          />
        );
      case "CelPay":
        return (
          <Image
            style={[
              iconStyle.pngIcon,
              { marginVertical: 3, height: 30, width: 30 },
            ]}
            source={pngIcons.CelPay}
          />
        );
      case "Celsius":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Celsius}
          />
        );
      case "CheckCircle":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.CheckCircle}
          />
        );
      case "CirclePlus":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.CirclePlus}
          />
        );
      case "CloseCircle":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.CloseCircle}
          />
        );
      case "Community":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Community}
          />
        );
      case "Contacts":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Contacts}
          />
        );
      case "Couple":
        return (
          <Image
            style={[iconStyle.pngIcon, { height: 30, width: 30 }]}
            resizeMode={"contain"}
            source={pngIcons.Couple}
          />
        );
      case "Deposit":
        return (
          <Image
            style={[
              iconStyle.pngIcon,
              { marginVertical: 3, height: 30, width: 30 },
            ]}
            source={pngIcons.Deposit}
            resizeMode={"contain"}
          />
        );
      case "DrivingLicense":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.DrivingLicense}
          />
        );
      case "Earned":
        return (
          <Image
            style={[iconStyle.pngIcon, { height: 30, width: 30 }]}
            resizeMode={"contain"}
            source={pngIcons.Earned}
          />
        );
      case "EyeHide":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.EyeHide}
          />
        );
      case "EyeShow":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.EyeShow}
          />
        );
      case "Filter":
        return (
          <Image
            style={[iconStyle.pngIcon, { height: 30 }]}
            resizeMode={"contain"}
            source={pngIcons.Filter}
          />
        );
      case "GreenCheck":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.GreenCheck}
          />
        );
      case "GridView":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.GridView}
          />
        );
      case "IDCard":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.IDCard}
          />
        );
      case "Info":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Info}
          />
        );
      case "InfoCircle":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.InfoCircle}
          />
        );
      case "Key":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Key}
          />
        );
      case "ListView":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.ListView}
          />
        );
      case "Loan":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Loan}
          />
        );
      case "Loans":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Loans}
          />
        );
      case "Lock":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Lock}
          />
        );
      case "Mail":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Mail}
          />
        );
      case "Mobile":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Mobile}
          />
        );
      case "MyCel":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.MyCel}
          />
        );
      case "NewWindowIcon":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.NewWindowIcon}
          />
        );
      case "NotSecure":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.NotSecure}
          />
        );
      case "Notifications":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Notifications}
          />
        );
      case "Passport":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Passport}
          />
        );
      case "PiggyBank":
        return (
          <Image
            style={[iconStyle.pngIcon, { height: 30, width: 30 }]}
            resizeMode={"contain"}
            source={pngIcons.PiggyBank}
          />
        );
      case "Profile":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Profile}
          />
        );
      case "Rates":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Rates}
          />
        );
      case "ReceiveArrowTransactions":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.ReceiveArrowTransactions}
          />
        );
      case "Refer":
        return (
          <Image
            style={[iconStyle.pngIcon, { height: 30, width: 30 }]}
            resizeMode={"contain"}
            source={pngIcons.Refer}
          />
        );
      case "Search":
        return (
          <Image
            style={[iconStyle.pngIcon, { height: 30, width: 30 }]}
            resizeMode={"contain"}
            source={pngIcons.Search}
          />
        );
      case "Security":
        return (
          <Image
            style={[iconStyle.pngIcon, { height: 30, width: 30 }]}
            resizeMode={"contain"}
            source={pngIcons.Security}
          />
        );
      case "Sent":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Sent}
          />
        );
      case "Settings":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Settings}
          />
        );
      case "Shield":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Shield}
          />
        );
      case "StackedCoins":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.StackedCoins}
          />
        );
      case "Support":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Support}
          />
        );
      case "Switch":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.Switch}
          />
        );
      case "Total":
        return (
          <Image
            style={[iconStyle.pngIcon, { height: 30, width: 30 }]}
            resizeMode={"contain"}
            source={pngIcons.Total}
          />
        );
      case "TransactionCC":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.TransactionCC}
          />
        );
      case "TransactionCancelled":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.TransactionCancelled}
          />
        );
      case "TransactionCelsius":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.TransactionCelsius}
          />
        );
      case "TransactionInterest":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.TransactionInterest}
          />
        );
      case "TransactionLoan":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.TransactionLoan}
          />
        );
      case "TransactionLocked":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.TransactionLocked}
          />
        );
      case "TransactionReceived":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.TransactionReceived}
          />
        );
      case "TransactionSent":
        return (
          <Image
            style={[iconStyle.pngIcon, height, width]}
            resizeMode={"contain"}
            source={pngIcons.TransactionSent}
          />
        );
      case "Transactions":
        return (
          <Image
            style={[iconStyle.pngIcon, { height: 30, width: 30 }]}
            resizeMode={"contain"}
            source={pngIcons.Transactions}
          />
        );
      case "UtilityBill":
        return (
          <Image
            style={[iconStyle.pngIcon, { height: 30, width: 30 }]}
            resizeMode={"contain"}
            source={pngIcons.UtilityBill}
          />
        );
      case "Wallet":
        return (
          <Image
            style={[iconStyle.pngIcon, { height: 30, width: 30 }]}
            resizeMode={"contain"}
            source={pngIcons.Wallet}
          />
        );
      case "WalletSettings":
        return (
          <Image
            style={[iconStyle.pngIcon, { height: 30, width: 30 }]}
            resizeMode={"contain"}
            source={pngIcons.WalletSettings}
          />
        );
      case "WarningCircle":
        return (
          <Image
            style={[iconStyle.pngIcon, { height: 30, width: 30 }]}
            resizeMode={"contain"}
            source={pngIcons.WarningCircle}
          />
        );
      case "Withdraw":
        return (
          <Image
            style={[
              iconStyle.pngIcon,
              { marginVertical: 3, height: 30, width: 30 },
            ]}
            resizeMode={"contain"}
            source={pngIcons.Withdraw}
          />
        );
    }
  };

  render() {
    const { name, fill, iconOpacity, style } = this.props;
    const theme = getTheme();
    let fillColor = fill;
    let svgIcons = Svgs;

    if (getTheme() === "unicorn") {
      svgIcons = { ...Svgs, ...CommonSvgs };

      if (UNICORN_ICONS.includes(name)) {
        return (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {this.renderPngIcon(name)}
          </View>
        );
      }
    }

    if (["primary"].includes(fill)) fillColor = iconColors[fill][theme];
    const viewBox = svgIcons[`${name}ViewBox`] || this.props.viewBox;

    return (
      <View style={{ overflow: "hidden", opacity: iconOpacity }}>
        <SvgIcon
          viewBox={viewBox}
          name={name}
          {...this.props}
          svgs={svgIcons}
          fill={fillColor}
          style={[{ alignSelf: "center", justifyContent: "center" }, style]}
        />
      </View>
    );
  }
}

export default Icon;
