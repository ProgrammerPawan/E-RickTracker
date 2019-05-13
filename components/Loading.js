import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'
import { Actions } from 'react-native-router-flux';
export default class Loading extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          if(user){
            Actions.Main();
          }
          else{
            Actions.Login();
          }
          // {this.props.navigation.navigate(user ? 'Main' : 'Login')}
        })
      }
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  static navigationOptions = {
    header: null
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})