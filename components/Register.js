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
  Alert,
  ImageBackground
} from 'react-native';
import firebase from 'react-native-firebase'

import {Actions, ActionConst} from 'react-native-router-flux';
import UserInput from './UserInput';
import spinner from './images/loading.gif';

import usernameImg from './images/username.png';
import passwordImg from './images/password.png';
import eyeImg from './images/eye_black.png';
import bgSrc from './images/wallpaper.png';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      isLoading: false,
      username: 'safi',
      password: 'fdfdfd',
      repassword: 'fdfdfd',
      errorMessage: null,
      phone: 'dfdfdf',
      regno: 'dfdfdf',
      email: null,
    };
  } 
  handleSignUp = () => {
    if (this.state.isLoading) return;
    this.setState({isLoading: true});
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(()=> this.updateData())
      // .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  // TODO: Firebase stuff...
  console.log('handleSignUp')
} 
updateData = () => {
  var email = this.state.email;
  var regno = this.state.regno;
  var phoneno = this.state.phone;
  var name = this.state.username;
  const { currentUser } = firebase.auth();
  var path = 'SignupDetails/'+currentUser._user.uid;
            //Alert.alert(path);
            firebase.database().ref(path).set({phoneno,regno,email,name})
            .then((data)=>{
                //success callback
                Actions.Main()
                //Alert.alert('DAta gone')
                console.log('data ' , data)
            }).catch((error)=>{
                //error callback
                Alert.alert('DAtanot gone')
                console.log('error ' , error)
            })
}
recover() {
  Actions.Login();
}
  render() {
    return (
        <ImageBackground style={styles.picture} source={bgSrc}>
        <View  style={styles.container} keyboardShouldPersistTaps={'handled'}>
        <Text style={styles.appname}>SIGN-UP </Text>  
            <ScrollView>
                <UserInput
                source={usernameImg}
                placeholder="Name"
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                onChangeText={username=>this.setState({username})}
                />
                <UserInput
                source={usernameImg}
                placeholder="Registation Number"
                returnKeyType={'done'}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={regno=>this.setState({regno})}
                />
                <UserInput
                source={usernameImg}
                placeholder="Phone Number"
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                onChangeText={phone=>this.setState({phone})}
                />
                <UserInput
                source={usernameImg}
                placeholder="E-mail"
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                onChangeText={email=>this.setState({email})}
                />
                <UserInput
                source={passwordImg}
                placeholder="Password"
                secureTextEntry={this.state.showPass}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                onChangeText={password=>this.setState({password})}
                />
                <UserInput
                source={passwordImg}
                placeholder="Confirm Password"
                secureTextEntry={this.state.showPass}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                onChangeText={repassword=>this.setState({repassword})}
                />
                
                        
                <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleSignUp}
                    activeOpacity={1}>
                    {this.state.isLoading ? (
                        <Image source={spinner} style={styles.image} />
                    ) : (
                        <Text style={styles.text}>LOGIN</Text>
                    )}
                </TouchableOpacity> 

                <TouchableOpacity style={styles.click} onPress={this.recover}>
                  <Text style={styles.signup} >Go back to LogIn</Text>
                </TouchableOpacity> 

                </View>        
            </ScrollView>
            {this.state.errorMessage &&
              <Text style={{ color: 'red' }}>
                {this.state.errorMessage}
              </Text>}
            </View>
      </ImageBackground>
    );
  }
    static navigationOptions = {
      header: null
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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

  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  appname: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
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
  signup: {
    color: 'white',
    marginTop: 20,
    backgroundColor: 'transparent',
    height: MARGIN,
  },
});
