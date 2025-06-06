import Reactotron, { trackGlobalErrors } from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .use(trackGlobalErrors())
  .configure() // controls connection & communication settings
  .useReactNative({
    storybook: true,
  }) // add all built-in react native plugins
  .connect(); // let's connect!

export default Reactotron;
