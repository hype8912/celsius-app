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

    switch (name) {
      case "Ape":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Ape.png`)}
          />
        );
      case "Appearance":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Appearance.png`)}
          />
        );
      case "Average":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Average.png`)}
          />
        );
      case "Borrow":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Borrow.png`)}
          />
        );
      case "CelPay":
        return (
          <Image
            style={[
              iconStyle.pngIcon,
              { marginVertical: 3, height: 30, width: 30 },
            ]}
            source={require(`../../../../assets/images/unicorn-icons/CelPay.png`)}
          />
        );
      case "Celsius":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Celsius.png`)}
          />
        );
      case "CheckCircle":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/CheckCircle.png`)}
          />
        );
      case "CirclePlus":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/CirclePlus.png`)}
          />
        );
      case "CloseCircle":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/CloseCircle.png`)}
          />
        );
      case "Community":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Community.png`)}
          />
        );
      case "Contacts":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Contacts.png`)}
          />
        );
      case "Couple":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Couple.png`)}
          />
        );
      case "Deposit":
        return (
          <Image
            style={[
              iconStyle.pngIcon,
              { marginVertical: 3, height: 30, width: 30 },
            ]}
            source={require(`../../../../assets/images/unicorn-icons/Deposit.png`)}
            resizeMode={"contain"}
          />
        );
      case "DrivingLicense":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/DrivingLicense.png`)}
          />
        );
      case "Earned":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Earned.png`)}
          />
        );
      case "EyeHide":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/EyeHide.png`)}
          />
        );
      case "EyeShow":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/EyeShow.png`)}
          />
        );
      case "Filter":
        return (
          <Image
            style={[iconStyle.pngIcon, { height: 30 }]}
            resizeMode={"contain"}
            source={require(`../../../../assets/images/unicorn-icons/Filter.png`)}
          />
        );
      case "GreenCheck":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/GreenCheck.png`)}
          />
        );
      case "GridView":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/GridView.png`)}
          />
        );
      case "IDCard":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/IDCard.png`)}
          />
        );
      case "Info":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Info.png`)}
          />
        );
      case "InfoCircle":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/InfoCircle.png`)}
          />
        );
      case "Key":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Key.png`)}
          />
        );
      case "ListView":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/ListView.png`)}
          />
        );
      case "Loan":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Loan.png`)}
          />
        );
      case "Loans":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Loans.png`)}
          />
        );
      case "Lock":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Lock.png`)}
          />
        );
      case "Mail":
        return (
          <Image
            style={{ height: 40, resizeMode: "contain" }}
            source={require(`../../../../assets/images/unicorn-icons/Mail.png`)}
          />
        );
      case "Mobile":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Mobile.png`)}
          />
        );
      case "MyCel":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/MyCel.png`)}
          />
        );
      case "NewWindowIcon":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/NewWindowIcon.png`)}
          />
        );
      case "NotSecure":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/NotSecure.png`)}
          />
        );
      case "Notifications":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Notifications.png`)}
          />
        );
      case "Passport":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Passport.png`)}
          />
        );
      case "PiggyBank":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/PiggyBank.png`)}
          />
        );
      case "Profile":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Profile.png`)}
          />
        );
      case "Rates":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Rates.png`)}
          />
        );
      case "ReceiveArrowTransactions":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/ReceiveArrowTransactions.png`)}
          />
        );
      case "Refer":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Refer.png`)}
          />
        );
      case "Search":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Search.png`)}
          />
        );
      case "Security":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Security.png`)}
          />
        );
      case "Sent":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Sent.png`)}
          />
        );
      case "Settings":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Settings.png`)}
          />
        );
      case "Shield":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Shield.png`)}
          />
        );
      case "StackedCoins":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/StackedCoins.png`)}
          />
        );
      case "Support":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Support.png`)}
          />
        );
      case "Switch":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Switch.png`)}
          />
        );
      case "Total":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Total.png`)}
          />
        );
      case "TransactionCC":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/TransactionCC.png`)}
          />
        );
      case "TransactionCancelled":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/TransactionCancelled.png`)}
          />
        );
      case "TransactionCelsius":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/TransactionCelsius.png`)}
          />
        );
      case "TransactionInterest":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/TransactionInterest.png`)}
          />
        );
      case "TransactionLoan":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/TransactionLoan.png`)}
          />
        );
      case "TransactionLocked":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/TransactionLocked.png`)}
          />
        );
      case "TransactionReceived":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/TransactionReceived.png`)}
          />
        );
      case "TransactionSent":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/TransactionSent.png`)}
          />
        );
      case "Transactions":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Transactions.png`)}
          />
        );
      case "UtilityBill":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/UtilityBill.png`)}
          />
        );
      case "Wallet":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/Wallet.png`)}
          />
        );
      case "WalletSettings":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/WalletSettings.png`)}
          />
        );
      case "WarningCircle":
        return (
          <Image
            style={iconStyle.pngIcon}
            source={require(`../../../../assets/images/unicorn-icons/WarningCircle.png`)}
          />
        );
      case "Withdraw":
        return (
          <Image
            style={[
              iconStyle.pngIcon,
              { marginVertical: 3, height: 30, width: 30 },
            ]}
            source={require(`../../../../assets/images/unicorn-icons/Withdraw.png`)}
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
