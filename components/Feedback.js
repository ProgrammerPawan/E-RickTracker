import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  Alert,
  ImageBackground
} from 'react-native';
import firebase from 'react-native-firebase'
import {Actions, ActionConst} from 'react-native-router-flux';
import UserInput from './UserInput';
import spinner from './images/loading.gif';

import usernameImg from './images/username.png';
import bgSrc from './images/wallpaper.png';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class Feedback extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      msg: 'ui',
      subject: 'improve ui',
    };
  } 
 
updateData = () => {
    if (this.state.isLoading) return;
    this.setState({isLoading: true});
    var d = new Date();
    var msg = this.state.msg;
    var subject = this.state.subject;
    //Alert.alert(d.toString());
    const { currentUser } = firebase.auth();
    var path = 'TFeedback/'+currentUser._user.uid+'/'+d.toString();
        //Alert.alert(path);
        firebase.database().ref(path).set({msg,subject})
        .then((data)=>{
            //success callback
            Alert.alert('Success','Thanks for you feedback..')
            this.setState({isLoading: false});
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            Alert.alert('Error','A error accured, please try after some time');
            this.setState({isLoading: false});
            console.log('error ' , error)
    })
}

  render() {
    return (
        <ImageBackground style={styles.picture} source={bgSrc}>
        <View  style={styles.container} keyboardShouldPersistTaps={'handled'}>
        <Text style={styles.appname}>FEEDBACK </Text>  
            <ScrollView>
                <UserInput
                source={usernameImg}
                placeholder="Subject"
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                onChangeText={subject=>this.setState({subject})}
                />
                <UserInput
                source={usernameImg}
                placeholder="Enter yor feedback here"
                returnKeyType={'done'}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={msg=>this.setState({msg})}
                />
                        
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.updateData}
                        activeOpacity={1}>
                        {this.state.isLoading ? (
                            <Image source={spinner} style={styles.image} />
                        ) : (
                            <Text style={styles.text}>SUBMIT</Text>
                        )}
                    </TouchableOpacity> 
                </View>        
            </ScrollView>
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
});
