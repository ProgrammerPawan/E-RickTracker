// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
// import Routes from './components/Routes';

// export default class App extends Component {
//   render() {
//     return (
//      <Routes/>
//     );
//   }
// }

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

// import the different screens
import Loading from './components/Loading'
import SignUp from './components/Register'
import Login from './components/LoginScreen'
import Main from './components/Main'
import Feedback from './components/Feedback'

export default class App extends Component {
    render(){
    return (
      <Router>
        <Scene key="root">
          {/* <Scene key="Home"component={Home} /> */}
          <Scene key="Main" component={Main}/>
          <Scene key="Login" component={Login}/>
          <Scene key="SignUp" component={SignUp}/>
          <Scene key="Feedback" component={Feedback}/>
          <Scene key="Loading" component={Loading} initial/>
        </Scene>
      </Router>
    );
  }}
 

