import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated, 
  Easing,
  Text,
  Alert
} from 'react-native';
//import {Actions, ActionConst, Reducer} from 'react-native-router-flux';
import firebase from 'react-native-firebase'
import { Actions } from 'react-native-router-flux';
import UserInput from './UserInput';
import spinner from './images/loading.gif';
import usernameImg from './images/username.png';
import passwordImg from './images/password.png';
import eyeImg from './images/eye_black.png';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      isLoading: false,
      username: 'pawan.pk98@gmail.com',
      password: 'pawankumar',
      errorMessage: null
    };
    this.showPass = this.showPass.bind(this);
    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    //this._onPress = this._onPress.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }
  //state = { email: 'pawan.pk98@gmail.com', password: 'pawankumar', errorMessage: null }
  
  handleLogin = () => {
    if (this.state.isLoading) return;
    this.setState({isLoading: true});
    const { username, pasword } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.username, this.state.password)
      .then(()=> Actions.Main())
      // .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
    // TODO: Firebase stuff...
    console.log('handleLogin')
  }

  signup() {
    Actions.SignUp();
  }
  recover = () => {
    //Alert.alert(this.state.username)
    firebase.auth().sendPasswordResetEmail(this.state.username)
      .then(function (user) {
        Alert.alert('Alert..!!','An email has been sent, please reset the password and login again.')
      }).catch(function (e) {
        Alert.alert('Error Occurred ','Please try again...')
        console.log(e)
      })    
  }
  

  render() {
   
    return (
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <UserInput
          source={usernameImg}
          placeholder="Email"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          onChangeText={username=>this.setState({username})}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry={this.state.showPass}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={password=>this.setState({password})}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}>
          <Image source={eyeImg} style={styles.iconEye} />
        </TouchableOpacity>
        
        <View style={styles.container}>
          <TouchableOpacity
              style={styles.button}
              onPress={this.handleLogin}
              activeOpacity={1}>
              {this.state.isLoading ? (
                <Image source={spinner} style={styles.image} />
              ) : (
                <Text style={styles.text}>LOGIN</Text>
              )}
          </TouchableOpacity>
        </View>
        
        <View style={styles.container2}>
        <TouchableOpacity style={styles.click}>
          <Text style={styles.signup} onPress={this.signup}>Create Account      </Text>
        </TouchableOpacity> 
        
        <TouchableOpacity style={styles.click}>
          <Text style={styles.signup} onPress={this.recover}>Forgot Password?</Text>
        </TouchableOpacity> 
          
        </View>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  btnEye: {
    position: 'absolute',
    marginTop: 32,
    top: 55,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },

  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    width: DEVICE_WIDTH - 40,
    borderRadius: 20,
    zIndex: 100,
    marginTop: 20,
  },
  container2: {
    flex: 1,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    width: 24,
    height: 24,
  },
  signup: {
    color: 'white',
    marginTop: 20,
    backgroundColor: 'transparent',
    height: MARGIN,
  },

});
