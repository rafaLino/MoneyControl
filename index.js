/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { typography } from './typograph';

typography();
AppRegistry.registerComponent(appName, () => App);
