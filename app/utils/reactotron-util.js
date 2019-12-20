import { AsyncStorage, NativeModules } from "react-native";
import { reactotronRedux } from "reactotron-redux";
import Reactotron from "reactotron-react-native";

const scriptURL = NativeModules.SourceCode.scriptURL;
const scriptHostname = scriptURL.split("://")[1].split(":")[0];

Reactotron.clear();

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({ host: scriptHostname }) // controls connection & communication settings
  .useReactNative({ storybook: true }) // add all built-in react native plugins
  .use(reactotronRedux())
  .connect(); // let's connect!

export default reactotron;
