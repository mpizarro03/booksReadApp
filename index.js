import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Amplify from '@aws-amplify/core';
import config from './aws-exports';
import 'react-native-gesture-handler';

Amplify.configure(config);
AppRegistry.registerComponent(appName, () => App);
