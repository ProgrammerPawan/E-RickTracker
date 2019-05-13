import React, {Component} from 'react';
import {StyleSheet, Image, ImageBackground, Text, View} from 'react-native';
import Form from './Form';
import bgSrc from './images/wallpaper.png';
import logoImg from './images/logo.png';
export default class LoginScreen extends Component {
render() {
return (

      <ImageBackground style={styles.picture} source={bgSrc}>
      <View style={styles.container}>
        <Image source={logoImg} style={styles.applogo} />
        <Text style={styles.appname}>E-RICK TRACKER</Text>
        </View>
        <Form /> 
        
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
    justifyContent: 'center',
  },
  applogo: {
    width: 140,
    height: 140,
  },
  appname: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
  },
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});

