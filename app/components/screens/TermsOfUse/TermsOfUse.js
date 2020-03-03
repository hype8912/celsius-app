import React, { Component } from "react";
import { View, Linking } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNavigationFocus } from "react-navigation";


import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import TermsOfUseStyle from "./TermsOfUse.styles";
import CelButton from "../../atoms/CelButton/CelButton";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";

@connect(
  state => ({
    appSettings: state.user.appSettings,
    fabType: state.ui.fabType
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TermsOfUse extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: "Terms Of Use",
      hideBack: !!(params && params.purpose)

    };
  };

  constructor(props) {
    super(props);

    this.state = {
      terms: [
        {
          heading: "1. Introduction\n",
          text: "Celsius Network Limited (“we”, “our”, “us”, “Celsius”, or the “Company”) provides the following Terms and Conditions (the “Terms”) that apply to our users (each, “you” or “User”) when using or purchasing Celsius’ products and services through our mobile application, our website, or any other online services we provide (collectively, the “Services”). The Services are provided solely for use by you, and your use of the Services is expressly conditioned on your consent to, and compliance with, these Terms. By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to any of the provisions of these Terms you should immediately stop using the Services. In addition, our Privacy Policy is set forth here: https://celsius.network/privacy-policy/ and is incorporated into these Terms in its entirety. We encourage you to read these Terms carefully and use them to make informed decisions.\n" +
            "\n" +
            "Celsius Network is the next generation of Digital Assets-related services, serving as a value-driven lending and borrowing platform for all members of the Celsius Network community. Celsius Network allows Users to take advantage of a variety services, all in accordance with applicable law and regulation, including:\n" +
            "Become members in the Celsius platform and community;\n" +
            "Deposit their Digital Assets in the Celsius wallet and gain interest;\n" +
            "Apply for dollar loans with Digital Assets as collateral; and\n" +
            "Instantly transfer Digital Assets to other Users through our innovative CelPay feature.\n" +
            "\n" +
            "Celsius Network is built around the Celsius Token (CEL) that allows Users to take advantage of different utilities, primarily to gain better terms and opportunities when using Celsius’ Services.\n"
        },
        {
          heading: "2. Definitions\n",
          text: "Capitalized terms shall have the meanings assigned to them in these Terms, unless the context requires otherwise.\n" +

            "AFFILIATE means an entity that owns or controls, is owned or controlled by, or is or under common control or ownership with a party, where control is defined as the direct or indirect power to direct or cause the direction of the management and policies of such party, whether through ownership of voting securities, by contract, or otherwise.\n" +

            "AML stands for Anti-Money Laundering, which means a set of procedures, laws, and regulations that are intended to stop the practice of generating income through illegal actions.\n" +

            "BLOCKCHAIN means a system in which records of transactions made in Digital Assets are maintained across several computers that are linked in a peer-to-peer network.\n" +

            "DIGITAL ASSET means digital representation of value in which encryption techniques are used to regulate the generation of digital units and verify the transfer of funds, operating independently from a central bank.\n" +

            "ELIGIBLE DIGITAL ASSET means the types of Digital Assets we may choose to accept and support from time to time, which are subject to change in our sole discretion, based on business and regulatory considerations.\n" +

            "FIAT, when used in reference to money or currency, means any money that a recognized government declares as legal tender, and has value only because such government maintains its value.\n" +

            "KYC stands for Know Your Customer (or Client), which means the process of a business verifying the identity of its customers or clients and assessing potential risks of illegal intentions for the business relationship.\n" +

            "PEGGING is the practice of fixing the exchange rate of one currency to the value of another currency or asset.\n" +

            "STABLECOIN means a Digital Asset that is Pegged to a distinct asset.\n"
        },
        {
          heading: "3. Eligibility and Proof of Identity\n",
          text: "You must be at least eighteen (18) years old to open a Celsius Account (“Account”). Celsius is not obligated to accept any application from any applicant, and has sole and absolute discretion to accept or reject applications to open Accounts. Celsius has no responsibility or liability towards any applicant unless and until Celsius provides written confirmation that an Account has been opened for such applicant.\n" +
            "\n" +
            "Celsius Accounts are not available where prohibited by law or by Celsius policy, as updated from time to time; currently, such places include the States of New York and Washington, as well as the countries of Iran, North Korea, Sudan, South Sudan, Syria, Cuba, or any other country against which the United States, the United Kingdom or the European Union imposes financial sanctions or embargoes.  \n" +
            "\n" +
            "Be advised that in some jurisdictions, due to regulatory considerations, Celsius may not provide part or all of the Services. \n" +
            "\n" +
            "Due to changing regulatory requirements and interpretations in the Digital Assets markets, Celsius will use its sole and absolute discretion to revise the list of prohibited jurisdictions and/or reject specific applications to open Accounts and/or use part or all of the Services, where Celsius determines that regulatory or policy reasons prevent Celsius from being able to offer its Services.\n" +
            "\n" +
            "Celsius is required to comply with applicable Anti Money Laundering (AML) and Know Your Client (KYC) requirements before and after you open an Account. When you apply to open an Account, we will ask for documentation and information, including but not limited to copies of your government-issued identification document (e.g. Passport, driver’s license). For corporate accounts, we may require identification information related to the directors, officers, or equity owners of the business.  We may also use information from third parties to help us confirm your identity and/or determine if we should open or maintain your Account. You represent and warrant at all times that any and all information provided by you to us is true, accurate, and not misleading in any respect. If any such information changes, it is your obligation to provide the new information to us as soon as practicable following such change."
        },
        {
          heading: "4. Nature of e-Services\n",
          text: "Celsius’ Services allow you to review your Account and conduct certain transactions online. You are solely responsible for the activities under your Account and for securing your Account IDs, passwords, hints, or any other codes that you use to access your Account and the Services. Celsius is not responsible for any loss or compromise of your access information and/or your personal information, or for any loss that you may sustain due to compromise of your access information and/or personal information.\n" +
            "\n" +
            "We will not be liable for following any instruction we receive through your Account, even if it was not authorized by you, or if it was entered by mistake or is otherwise inaccurate. To verify the authenticity of any instruction we receive through your Account, we may require your signature or identification in any form we deem necessary; at our sole discretion, we may accept digital images and electronic signatures for documents that need to be signed.  You agree to reimburse us (and we may charge your Account) for all claims, costs, losses and damages, including reasonable attorneys’ fees, that result from our following of your instructions to take any action related to your Account.\n"
        },
        {
          heading: "5. Account Types\n",
          text: "(A) Individual Account\n" +
            "This Account is owned by only one natural person who is and will continue to be the only person authorized to take any action in the Account. By opening an Individual Account, you represent and warrant that you are and shall at all times continue to be the sole beneficial owner of the Account and user of all Services facilitated or generated therefrom.\n" +
            "(B) Corporate Account\n" +
            "This Account is owned by a corporation, unincorporated association, a company, a partnership, fiduciary, sole proprietorship or other legally recognized group (interchangeably defined as an “Entity”) holding an Account in any capacity other than an individual capacity. An Entity can apply to open an Account through any natural person(s) who is duly authorized by the Entity to do so (an “Authorized Representative\").\n" +
            "Such Authorized Representative represents and agrees, on behalf of the Entity, as well as on his or her own behalf, that he or she:\n" +
            "(I) is fully authorized to execute all documents or otherwise complete our requirements in his or her stated capacity;\n" +
            "(II) has provided us all documents or other information necessary to demonstrate that authority; and\n" +
            "(III) will provide other documents and complete other requirements as we may request from time to time.\n" +
            "We may refuse to recognize any such authorization if, in our reasonable judgment, it appears to be incomplete or improperly executed.\n" +
            "By opening a Corporate Account, the Authorized Representative represents and warrants on behalf of the Entity that the Entity is and shall at all times continue to be the sole beneficial owner of the Account and user of all Services facilitated or generated therefrom, and that the ultimate beneficial owners of all funds and assets belonging to the Entity are as represented during the establishment of the Account.\n"
        },
        {
          heading: "6. Authorized Users\n",
          text: "For both Individual Accounts and Corporate Accounts, we may follow any instructions regarding your Account provided that we reasonably believe such instructions are authorized by the Account holder.\n"
        },
        {
          heading: "7. Contributions\n",
          text: "All contributions to your Account must consist of Eligible Digital Assets and must be transferred to the deposit address provided in your Celsius Account (or as otherwise notified by us to you). We reserve the right to reject any deposit, and/or the right to return any deposit already made, each at your expense. Any deposit received will be treated by us as being received at the date and time stamped on the Blockchain confirmation.\n"
        },
        {
          heading: "8. Ownership of Digital Assets\n",
          text: "You hereby represent and warrant to us at all times during which you hold Digital Assets in your Account that any Digital Asset used by you in connection with your Account is owned by you or that you are validly authorized to carry out transactions using such Digital Assets, and that all transactions initiated with your Account are for your own Account and not on behalf of any other person or entity. You further represent and warrant that all such Digital Assets are free from any claims, indebtedness, liens, or third-party interests.\n"
        },
        {
          heading: "9. Set off and Security Interest Rights\n",
          text: "User agrees to Celsius’ E-Sign Consent Agreement, which is incorporated by reference into these Deposit Terms as if it were set forth herein in its entirety. The E-Sign Consent Agreement constitutes User’s consent to receive disclosures and other information in electronic form unless prohibited by law in which case such notice(s) will be mailed certified return receipt requested, postage prepaid, or delivered by overnight delivery service. In connection with the Services, Celsius is required by law to provide you with certain disclosures. Without User’s consent, Celsius is not permitted to provide those disclosures to you online.\n" +
            "We may take or set off funds in any or all of your Accounts, or transfer funds between any or all of your Accounts with us or any of our Affiliates for direct, indirect, and acquired Obligations that you owe us or our Affiliates, including any balances as a result of not having sufficient funds available, regardless of the source of funds in an Account. These rights are in addition to other rights we have to take, transfer, or charge funds in your Accounts for Obligations you owe us or our Affiliates.\n" +
            "\n" +
            "Your acceptance of these Terms serves as your consent to Celsius’ asserting its security interest or exercising its right of set off should any laws governing your Account require your consent. If the law restricts our ability to take, transfer, or set off funds in your Account, or if some deposits are protected from attachment, levy, or legal process, you waive those conditions and limits to the full extent that you may do so by contract, and you authorize us to apply funds in any or all of your Accounts to your Obligations.\n" +
            "\n" +
            "We hereby agree that, to the extent permitted by applicable law, you may take or set off funds in your Account, or any amounts we owe you with respect thereto, against the Obligations. If the law restricts your ability to take, transfer, or setoff funds in your Account, or if some deposits are protected from attachment, levy, or legal process, we waive those conditions and limits to the full extent that we may do so by contract, and we authorize you to apply funds in any or all of your Accounts to your Obligations.\n"
        },
        {
          heading: "10. Risk Disclosure\n",
          text: "These Terms and the deposit relationship do not create a fiduciary relationship between us and you; your Account is not a checking or savings account, and it is not covered by insurance against losses. We may lend, sell, pledge, hypothecate, re-hypothecate, assign, invest, use, commingle or otherwise dispose of funds and Eligible Digital Assets to counterparties or hold the Eligible Digital Assets with counterparties. We will use our best commercial and operational efforts to prevent losses.\n" +
            "\n" +
            "Most Digital Assets are not legal tender, are not backed by any government, and accounts and value balances are not subject to Federal Deposit Insurance Corporation or Securities Investor Protection Corporation protections. Legislative and regulatory changes or actions at the state, federal, or international level may adversely affect the use, transfer, exchange, and value of Digital Assets. Transactions in Digital Assets may be irreversible, and, accordingly, losses due to fraudulent or accidental transactions may not be recoverable. Any secured account maintained by Celsius for the benefit of its customers may not be sufficient to cover all losses incurred by customers.\n" +
            "\n" +
            "The value of Digital Assets may be derived from the continued willingness of market participants to exchange Digital Assets for Fiat currencies or other Digital Assets. If such willingness is abolished for any reason, this may result in the potential for permanent and total loss of value of a particular Digital Asset. \n" +
            "\n" +
            "The volatility and unpredictability of the price of Digital Assets may result in significant loss over a short period of time. The nature of Digital Assets may lead to an increased risk of fraud or cyber-attack, including rollback attacks or Blockchain reorganizations. The nature of Digital Assets means that any technological difficulties experienced by Celsius may prevent the access or use of your Digital Assets and/or cause losses of Digital Assets. \n" +
            "\n" +
            "In light of these risks, which are only some of the risks involved in using the Services and holding or trading in Digital Assets, and do not constitute an exhaustive list of such risks, you should carefully consider whether holding or trading Digital Assets in general and/or using our Services is suitable for you in light of your financial condition."
        },
        {
          heading: "11. Deposits\n",
          text: "You can make a deposit to your Account by transferring Eligible Digital Assets to the deposit address provided by Celsius. The transfer of such Eligible Digital Assets to your Account will not be deemed settled and completed until the Blockchain transaction is deemed confirmed to the relevant address.\n"
        },
        {
          heading: "12. Withdrawals\n",
          text: "You may make a complete or partial withdrawal of funds from your Account at any time. Celsius initiates the withdrawal process immediately following a withdrawal request when possible; however, we may require up to three (3) business days after you submit your withdrawal request to process the withdrawal. \n" +
            "\n" +
            "For every withdrawal request, you will be required to provide the details of the wallet to which you wish to transfer your Digital Assets. In the event that the details you provide are inaccurate, incomplete or misleading, your Digital Assets may be permanently lost. We will not be liable for any loss that results from inaccurate, incomplete or misleading details that you may provide for such transfer. If the transfer address you specify is one to which we are unable to process transfers, we will have no liability for any resulting failure or delay in processing your requested withdrawal.\n" +
            "\n" +
            "Celsius and our third-party partners may experience cyber-attacks, extreme market conditions, or other operational or technical difficulties which could result in the immediate halt of deposits and/or withdrawals either temporarily or permanently. Provided that Celsius has taken reasonable commercial and operational measures to prevent such events in technical systems controlled by Celsius, Celsius is not and will not be responsible or liable for any loss or damage of any sort incurred by you as a result of such cyber-attacks, operational or technical difficulties or suspensions of deposits or withdrawals. Withdrawal limits based on amounts and/or frequency may apply from time to time and will be described in your Account interface. Currently, the maximum withdrawal amount for a period of 24 hours is the equivalent of USD 20,000. Any individual request to exceed withdrawal limits set by Celsius must be sent via email to app@celsius.network.\t\n" +
            "\n" +
            "Every withdrawal request shall be deemed pending until accepted by us. We may refuse to accept such request, or delay the processing of an approved request for any reasonable reason, including but not limited to insufficient funds in your Account, inaccurate or misleading information provided by you, or any doubt or suspicion of money laundering or other financial crime related to your Account.\n" +
            "\n" +
            "Where you withdraw only a part of the funds available in your Account, the withdrawn funds will include first the principal amount (i.e. funds deposited by you) and only after these are withdrawn in full, any paid interest may be withdrawn.\n"
        },
        {
          heading: "13. How Interest Is Calculated and Paid\n",
          text: "All Eligible Digital Assets that are deposited with Celsius and (1) are not being used as collateral for loans; (2) were not paid to your Account as interest; (3) were not transferred to another Celsius user using CelPay; and (4) were not requested for withdrawal (Eligible Digital Assets meeting each of these four criteria, \"Deposited Digital Assets\") entitle you to gain interest while deposited with Celsius.\n" +
            "We generally announce our interest rate once per week on or around the first business day of each week. Interest will be payable in arrears and added to your Account on a weekly basis. We calculate the interest on your Deposited Digital Assets based on market demand. We will determine the interest rate for each week in our sole discretion, and you acknowledge that such rate may not be equivalent to benchmark interest rates observed in the market for bank deposit accounts or any other purpose.\n" +

            "Interest is gained based on a daily periodic rate to the Deposited Digital Assets in the Account. The daily periodic rate is calculated by dividing the applicable interest rate by three hundred sixty (360) days; then it is further divided down to the hour and minute of that day. Deposited Digital Assets will begin gaining interest according to the hour, minute, and second on the timestamp verifying the completion of the applicable transaction and shall cease and/or decrease the amount paid as interest at the moment when the User has entered a withdrawal and/or transfer (via CelPay) request.\n" +
            "We will credit your Account with the interest earned on or around the first business day of each week. Your Account must be open on such date in order for you to receive the applicable interest payment. All interest will be paid in-kind (in the same Digital Asset that is available in your Account) or in CEL, subject to our regulatory and business considerations. To make such in-kind interest payments as accurate as possible, Celsius rounds non-integer, rational numbers to the sub-cent, which is the smallest possible decimal available for the applicable Digital Asset.\n" +
            "Unless specifically mentioned and agreed by Celsius in writing, interest gained will NOT accrue additional interest (i.e. will NOT earn compound interest), and you will continue to accrue interest based only on your Deposited Digital Assets.\n" +

            "For users who are citizens or legal residents of the United States, Celsius requires your Taxpayer ID (TIN) or Social Security Number (SSN) to be updated in your Celsius user profile in order to gain interest on your Deposited Digital Assets. Celsius is not obligated to credit your Account retroactively with interest that would have been gained if you had otherwise updated your profile with your TIN.\n" +

            "If for any regulatory or legal reason we are limited in the interest rate we may offer you (or if we are completely restricted from paying any interest to you whatsoever), the interest to which you shall be entitled will be limited accordingly. Based on our reasonable interpretation of legal requirements, without prior notice we may limit the interest to which you will be entitled.\n"
        },
        {
          heading: "14. Consent to Celsius’ Use of Your Digital Assets\n",
          text: "In consideration for the interest earned on your Account and the use of our Services, you grant Celsius the right, subject to applicable law, without further notice to you, to hold the Digital Assets available in your account in Celsius’ name or in another name, and to pledge, re-pledge, hypothecate, re-hypothecate, sell, lend, or otherwise transfer or use any amount of such Digital Assets, separately or together with other property, with all attendant rights of ownership, and for any period of time, and without retaining in Celsius’ possession and/or control a like amount of Digital Assets or any other monies or assets, and to use or invest such Digital Assets at Celsius’ own risk. You acknowledge that, with respect to assets used by Celsius pursuant to this paragraph:\n" +
            "(I) You may not be able to exercise certain rights of ownership; and\n" +
            "(II) Celsius may receive compensation in connection with lending or otherwise using Digital Assets in its business to which you have no claim or entitlement."
        },
        {
          heading: "15. Hard Forks\n",
          text: "Any Blockchain may undergo software updates from time to time, which will result in a permanent divergence in the Blockchain (a “Hard Fork”). The result is such Blockchain will split into two separate and distinct Blockchains, and any Digital Asset on that original Blockchain may entitle its holders to a new type of Digital Asset (the “New Currency”). Due to the administrative complexity of being the repository for a hard-forked Digital Asset, the support of any New Currency in your Account is solely at the discretion of Celsius. If we make no public announcement regarding an anticipated Hard Fork, we will not support the New Currency, in which case all Accounts will be denominated in the legacy Digital Asset and all interest will accrue in the legacy Digital Asset.\n" +
            "\n" +
            "In the event that a Hard Fork achieves the required consensus, it is possible that we will only support the New Currency and will discontinue our support of the legacy Digital Asset. In the event of a Hard Fork that entitles you to a New Currency, you are advised to withdraw the applicable Digital Assets from your Account prior to the date of the Hard Fork. Celsius is not obligated in any way to monitor or maintain balances of New Currency issued to holders of the applicable Digital Assets upon a Hard Fork, or to credit you for the value of such New Currency. In the event you wish to receive New Currency issued upon a Hard Fork, you are advised to withdraw the applicable Digital Assets from your Account prior to the date of the Hard Fork. All determinations regarding Hard Forks shall be made by Celsius in its sole and absolute discretion and in accordance with applicable law.\n"
        },
        {
          heading: "16. CelPay\n",
          text: "CelPay is Celsius' proprietary Digital Asset payment tool for mobile applications. CelPay allows you to send payments in supported Digital Assets (currently BTC and ETH) to other registered Users. \n" +
            "\n" +
            "By using our CelPay feature, you understand and acknowledge that:\n" +
            "(I) transfers of funds by CelPay are not recorded on any Blockchain, but rather on Celsius' internal records;\n" +
            "(II) any payment sent to the wrong User may be irrevocably lost, and it is your sole responsibility to make sure you provide the correct address;\n" +
            "(III) the completion of a transfer may not be immediate, and it may take some time before the transfer is processed and the payee's account is credited;\n" +
            "(IV) use of the CelPay feature is subject to limitations on amounts transferred, as determined in Celsius' reasonable discretion from time to time;\n" +
            "(V) all CelPay transfers are final and irreversible;\n" +
            "(VI) you are familiar with the person to whom payment is made, and that such payment is not made for any illicit or illegal purpose.\n" +
            "Celsius does not accept any liability for transfers or attempted transfers would violate any law or regulation, including without limitation, KYC requirements, embargoed or restricted persons or locations, prohibitions against money laundering and/or anti-bribery laws, and structured transactions or tax evasion, and Celsius may refuse to perform, block, or otherwise void any transfers that Celsius reasonably believes could violate any law or regulation.\n"
        },
        {
          heading: "17. Taxes\n",
          text: "Within Celsius’ platform, you will be able to see a record of the transactions related to your Account which you may wish to use for the purposes of making any required tax filings or payments. It is your responsibility to determine what, if any, taxes apply to the payments you make or receive, and to collect, report, and remit the correct tax to the appropriate tax authority. We may deduct or make any tax withholdings or filings that we are required by law to make, but we are not responsible for determining whether taxes apply to your transaction, or for collecting, reporting, or remitting any taxes arising from any transaction. You are responsible for complying with applicable law. You agree that Celsius is not responsible for determining whether or which laws may apply to your transactions, including tax law. You are solely responsible for reporting and paying any taxes arising from your Account.\n"
        },
        {
          heading: "18. Account Statements\n",
          text: "We will make all logs and records of activities concerning your Account available to you through our mobile application only. We do not generate periodic statements showing the activity on your Account. You must examine these logs and records and notify us of any unauthorized use or any error or irregularity on your Account within fourteen (14) calendar days after the error occurs. If notice is not received within the fourteen (14) calendar-day period, you will not be able to raise any further claim in this respect."
        },
        {
          heading: "19. Conversion Rates\n",
          text: "Any conversion between a Digital Asset and another Digital Asset shall be made by us in accordance with the rates and prices applicable at the actual time of conversion. Applicable rates are indexed to those used by industry leading platforms, as we may choose to use from time to time, in our sole discretion. We currently use rates provided by BitGo, CMC Markets, and our own rates as determined by our liquidity providers. We may change these rate sources at any time and without giving prior notice or updating these Terms, and you shall not have any claims regarding our choice of rate sources or rates made available by any third party. \n"
        },
        {
          heading: "20. Closing an Account\n",
          text: "We have the right to close your Account at any time for any reason without advance notice. If your Account has a balance when we close it, we will return the remaining Digital Assets to you, including accrued interest earned until the close date, less any applicable penalty, withholding tax and other applicable deductions, unless prohibited by applicable law. Any Digital Assets that Celsius returns to you will be sent to the designated withdrawal addresses in your user profile on the Celsius platform for each respective Digital Asset you hold. Accounts are not transferable or assignable in whole or in part. Celsius may be required by law to turn over the funds in abandoned or unclaimed customer accounts to the state of your last known residence (“Escheatment”). Escheatment periods vary by jurisdiction, and you are responsible to determine applicability of such laws in your place of residence.\n"
        },
        {
          heading: "21. Liability for Unauthorized Transfers from Your Account\n",
          text: "You are advised to notify us IMMEDIATELY via email to security@celsius.network if you believe that an electronic transfer has been made without your permission, or if your statement shows transfers that you did not make. YOU ACCEPT ALL RISKS OF UNAUTHORIZED ACCESS AND USE OF YOUR ACCOUNT."
        },
        {
          heading: "22. Eligible Digital Currency\n",
          text: "We may, from time to time and in our sole discretion, add and remove certain Digital Assets from our list of Eligible Digital Currencies. If a Digital Asset is removed, it will no longer be available to be used via our Services. We will notify our Users of our intention to add and/or remove Digital Assets as soon as practically reasonable. However, under certain circumstances (e.g. for legal reasons) such changes may be required to be made immediately and without prior notice. In the event any Digital Asset ceases to be an Eligible Digital Asset, you will no longer be entitled to receive any interest accrued on it or make any other use of it via our Services.\n"
        },
        {
          heading: "23. Disclosure of Account Information\n",
          text: "We may disclose information to third parties about you, your Account, or the transfers you make:\n" +
            "(I) Where it is necessary for the provision of our Services under these Terms;\n" +
            "(II) In order to verify the existence and condition of your Account for a third party, such as a referral partner;\n" +
            "(III) For the purpose of conducting our AML and KYC checks;\n" +
            "(IV) If you give us written authorization;\n" +
            "(V) In order to comply with any request or order by any government agency or competent court; and\n" +
            "(VI) As described in our Privacy Policy (https://celsius.network/privacy-policy/). "
        },
        {
          heading: "24. Conflict/Disputes Involving Your Account\n",
          text: "We are not liable to you for errors that do not result in financial loss to you. We may take any action that is authorized or permitted by these Terms without liability to you, even if such action causes you to incur fees, expenses or damages. If third parties make claims on your Account, or if we receive conflicting instructions from you, or if we become involved in or concerned about a dispute between you and any third party, we reserve the right to react in ways that we believe in good faith to be appropriate, including by closing your Account and returning the Digital Assets available therein, or interpleading funds to court. You are liable for all expenses and fees we incur for such conflicts or disputes, including internal costs and attorneys’ fees, and we may charge or deduct them directly from your Account.\n"
        },
        {
          heading: "25. Legal Process Affecting Accounts\n",
          text: "If legal action such as an attachment, garnishment, levy, or other state or federal legal process (“Legal Process”) is brought against or in connection with your Account, we may refuse to permit (or may limit) withdrawals or transfers from your Account until the Legal Process is satisfied or dismissed. Regardless of the terms of such Legal Process, we have first claim to any and all funds in your Account. We will not contest any Legal Process on your behalf, and we may take actions to comply with Legal Process without liability to you, provided that we reasonably believe any such action is appropriate under the circumstances. If we incur any expenses in connection with any Legal Process, including without limitation reasonable attorneys’ fees, we may charge such expenses and fees to any of your Accounts with us without prior notice to you, or we may bill you directly for such expenses and fees. Any garnishment or other levy against your Account is subject to our right of setoff and security interest."
        },
        {
          heading: "26. Indemnification and Limitation of Liability; Attorney’s Fees and Costs for Lawsuits\n",
          text: "You agree to indemnify and hold harmless Celsius and its employees, managers, partners and Affiliates from any losses, damages, suits and expenses, of whatever kind, including reasonable attorneys’ fees, that we incur in connection with or arising out of your use of your Account and/or the Services, or our activities in connection with such Account, and for your violation of any law, regulation, order or other legal mandate, or the rights of a third party, or any act or omission by you or any person acting on your behalf while using your Account, regardless of whether the specific use was expressly authorized by you. You agree to comply with applicable law and to not use your Account for any transaction or activity that is illegal or violates applicable laws, regulations or rules. Please note, your agreement to comply includes any and all applicable laws and regulations of the United States, as well as of your place of residency and any law applicable to you.\n" +
            "\n" +
            "We are not liable to you for claims, costs, losses or damages caused by an event that is beyond our reasonable control (e.g. the acts or omissions of third parties, natural disaster, emergency conditions, government action, equipment or communications malfunction). We are not liable for special, incidental, exemplary, punitive or consequential losses or damages of any kind. Except for any setoff permitted by applicable law and Section 9 of these Terms, any Obligations of ours may be satisfied solely from the assets of Celsius. Without limiting the generality of the foregoing, in no event shall you have any recourse, whether by setoff or otherwise, with respect to our Obligations, to or against any assets of any person or entity other than Celsius for Celsius' Obligations, including, without limitation, any member, Affiliate, investor, employee, officer, agent or advisor of Celsius. For the avoidance of doubt, the foregoing shall not limit any setoff permitted by applicable law and Section 9 of these Terms.\n" +
            "\n" +
            "We reserve the right to limit access to your Accounts, which can include temporarily or permanently removing your Account access via the internet, and/or restricting your Account, and/or closing your Accounts without prior notice to you (unless prior notice is required by law), and we shall have no liability for such actions. In addition, Celsius reserves the right to withhold or delay the withdrawal of funds or assets belonging to you if you fail to comply with these Terms. Our total, aggregate liability to you for any claim is limited to the face value of the applicable item or transaction, or the actual value of any funds not properly credited or debited.\n"
        },
        {
          heading: "27. Communications\n",
          text: "We may record and monitor our telephone conversations with you and your electronic communications with us (chat, e-mail, and other forms of electronic exchange). Unless the law requires otherwise, you consent in advance to such recording and monitoring and we do not need to remind you of these activities. You must promptly notify us of any change in your contact information, including residential post and email address. Failure to notify us in a timely fashion may result in delay or non-receipt of notices or correspondence."
        },
        {
          heading: "28. Waiver\n",
          text: "We may delay exercise of, or entirely waive any rights we have under these Terms. If we delay or waive our rights, you are still obligated to pay us Obligations you may owe us, remove any violation of these Terms and/or otherwise follow our instructions (as applicable). Any delay or waiver of our rights applies only to the specific instance in which we decide to delay or waive the provision and does not affect our other or subsequent rights in any way.\n"
        },
        {
          heading: "29. Changes in Terms\n",
          text: "Please be aware that the terms and conditions governing Accounts or the Services can change over time. We reserve the right to discontinue or make changes to any Accounts or Services. We may change these Terms, and we may add to or delete from these Terms, and the updated version will supersede all prior versions. We will provide notice of changes, additions, and deletions as required by law. If we have provided advance notice and you do not agree with a change, you may close your Account(s) before the effective date of the change, which shall be your sole remedy. Your continued maintenance of your Account following the effective date of any change will constitute your acceptance of such change and subject your Account to the modified Terms.\n"
        },
        {
          heading: "30. Assignment\n",
          text: "These Terms, or any of the rights and/or obligations provided hereunder, may not be assigned or otherwise transferred by you to any other person or Entity, whether by operation of law or otherwise, without Celsius’ express written consent, and any attempted assignment in violation of this prohibition shall be void ab initio and of no effect.  Celsius may assign or transfer these Terms and/or any or all of its rights and/or obligations hereunder at any time to any Affiliate of Celsius.  Any permitted assignment or transfer of or under these Terms shall be binding upon, and inure to the benefit of, the successors, executors, heirs, representatives, administrators and permitted assigns of the parties hereto.\n"
        },
        {
          heading: "31. Governing Law and Venue\n",
          text: "The relationship between you and Celsius is governed exclusively by the laws of the State of Delaware, without regard to its conflict of law provisions.  Any dispute arising out of, or related to, your Account or relationship with Celsius must be brought exclusively in the courts located in Dover, Delaware; however, Celsius may bring equitable relief or collections actions in any applicable jurisdiction.\n"
        }

      ]

    };
  }
  
  componentDidMount() {
    const { actions } = this.props
    actions.setFabType('hide')
  }

  componentDidUpdate () {
    const { isFocused, actions, fabType } = this.props
    if(fabType !== 'hide') {
      if (isFocused === true) {
        actions.setFabType('hide')
      }
    }
  }
  
  renderScreen(section, index) {
    const style = TermsOfUseStyle();
    return (
      <View key={index} style={style.wrapper}>
        <CelText type='H3' weight='bold' style={style.heading}>{section.heading}</CelText>
        <CelText style={style.text}> {section.text}</CelText>
      </View>
    );
  }


  render() {
    const { terms } = this.state;
    const { actions, appSettings, navigation } = this.props;

    const nextScreen = navigation.getParam("nextScreen");

    return (
      <RegularLayout fabType='hide'>
          {terms.map(this.renderScreen)}
          {!appSettings.accepted_terms_of_use &&
          <React.Fragment>
            <CelButton
              margin={"20 0 10 0"}
              onPress={() => {
                actions.setUserAppSettings({ accepted_terms_of_use: true });
                actions.navigateTo(nextScreen);
              }}
            >
              Accept and Continue
            </CelButton>
            <CelButton
              margin={"20 0 60 0"}
              onPress={() => Linking.openURL("mailto:app@celsius.network")}
              basic
            >
              Contact Support
            </CelButton>
          </React.Fragment>
          }
      </RegularLayout>
    );
  }
}

export default withNavigationFocus(TermsOfUse)
