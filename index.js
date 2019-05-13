/** @format */

import {AppRegistry, YellowBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Warning: isMounted(...) is deprecated',
    'Encountered an error loading page',
    'Deprecated firebase.User.prototype.signInWithEmailAndPassword in favor of firebase.User.prototype.signInAndRetrieveDataWithEmailAndPassword'
  ]);