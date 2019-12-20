import { AppRegistry } from "react-native";
import { getStorybookUI, configure } from "@storybook/react-native";

import "./rn-addons";

// import stories
configure(() => {
  // require('./stories');
  require("./stories/Styleguide/Styleguide.stories");
  require("../app/components/atoms/CelText/CelText.stories");
  require("../app/components/atoms/CelButton/CelButton.stories");
  require("../app/components/molecules/Banner/Banner.stories");
  require("../app/components/molecules/RegisterPromoCodeCard/RegisterPromoCodeCard.stories");
  require("../app/components/molecules/RegisterToUCard/RegisterToUCard.stories");
  require("../app/components/modals/Modal.stories");
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent("%APP_NAME%", () => StorybookUIRoot);

export default StorybookUIRoot;
