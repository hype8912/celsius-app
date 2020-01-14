import React, { Component } from "react";
import { WebView } from "react-native-webview";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../redux/actions";

// fix https://github.com/facebook/react-native/issues/10865
const patchPostMessageJsCode = `(${String(function() {
  const originalPostMessage = window.ReactNativeWebView.postMessage;
  const patchedPostMessage = function(message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };
  patchedPostMessage.toString = function() {
    return String(Object.hasOwnProperty).replace(
      "hasOwnProperty",
      "postMessage"
    );
  };
  window.ReactNativeWebView.postMessage = patchedPostMessage;
})})();`;

/**
 *
 * @param {*} onMsg: callback after received response, error of Google captcha or when user cancel
 * @param {*} siteKey: your site key of Google captcha
 * @param {*} style: custom style
 * @param {*} url: base url
 */

@connect(
  state => ({
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class GoogleReCaptcha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      captchaHeight: 150,
    };
  }

  generateTheWebViewContent = key => {
    const originalForm = `<!DOCTYPE html>
       <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
          function onSubmit(token) {
            // after receiving token send it to message
            window.ReactNativeWebView.postMessage(token);
          }

          function validate(event) {
            event.preventDefault();
            window.ReactNativeWebView.postMessage('increaseReCap')
            grecaptcha.execute()
          }

          function onload() {
            const element = document.getElementById('submit');
            element.onclick = validate;
          }
        </script>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>

        <style>
          .btn {
            background-color: #3F51AB;
            width:110px;
            height: 50px;
            color: #ffffff; padding: 8px 32px; margin-top: 8px;
            border: none; border-radius: 25px; font-size: medium;
          }
            .grecaptcha-badge {
              top: 80px !important;
              margin-right: 9.2%;
              transform: scale(0.5);
            /*visibility: hidden;*/
            }
          </style>

        </head>
        <body>
            <div
                id='recaptcha'
                class="g-recaptcha"
                data-sitekey="${key}"
                data-callback="onSubmit"
                data-size="invisible"
              >
            </div>
            <div style="text-align: center">
                <button class='btn' id='submit'>Log in</button>
            </div>
          <script>onload();</script>
        </body>
      </html>
     `;

    return originalForm;
  };

  onMsg = event => {
    const { formData, reCaptchaPassed } = this.props;

    if (
      event &&
      event.nativeEvent.data &&
      event.nativeEvent.data === "increaseReCap"
    ) {
      if (formData.reCaptchaKey) {
        reCaptchaPassed(event);
      }
      this.setState({
        captchaHeight: 500,
      });
    } else {
      reCaptchaPassed(event);
      this.setState({ captchaHeight: 150 });
    }
  };

  render() {
    const { siteKey, style, url } = this.props;
    const { captchaHeight } = this.state;
    return (
      <WebView
        originWhitelist={["*"]}
        mixedContentMode={"always"}
        onMessage={this.onMsg}
        javaScriptEnabled
        injectedJavaScript={patchPostMessageJsCode}
        automaticallyAdjustContentInsets
        style={[
          {
            backgroundColor: "transparent",
            width: "100%",
            height: captchaHeight,
          },
          style,
        ]}
        source={{
          html: this.generateTheWebViewContent(siteKey),
          baseUrl: `${url}`,
        }}
      />
    );
  }
}
export default GoogleReCaptcha;
