import React from 'react'
import { StyleSheet, Platform, Image, Text, View, TouchableOpacity, Dimensions, Alert} from 'react-native'
import firebase from 'react-native-firebase'
import { Actions } from 'react-native-router-flux';
import {Container,Header,Title,Content,Footer,FooterTab,Button,Icon,Left,Body,Right} from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

const LATITUDE = 31.2521009;
const LONGITUDE = 75.7035018;
const LATITUDE_DELTA = 0.0080;
const LONGITUDE_DELTA = 0.0080;


export default class Main extends React.Component {
  constructor(props) {
    super(props);
    global.arr = null,
    global.mark = [],
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0.0070,
        longitudeDelta: 0.0070,
      },
      coords: null,
      first: true,
    };
  }

  state = { currentUser: null }
  componentDidMount=()=>{
    if(this.state.first){
      this.setState({first: false});
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
      ok: "YES",
      cancel: "NO",
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true, // false => Directly catch method is called if location services are turned off
      preventOutSideTouch: true, //true => To prevent the location services popup from closing when it is clicked outside
      preventBackClick: true, //true => To prevent the location services popup from closing when it is clicked back button
      providerListener: true // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
    }).then(function(success) {
        // success => {alreadyEnabled: true, enabled: true, status: "enabled"} 
        console.log(success); // success => "enabled"
        //getUserLocation;
        }
    ).catch((error) => {
        console.log(error.message);
        
    });}
    else {
      this.setState({first: false});
    }
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    firebase.database().ref('Data/').on('value', function (snapshot) {
      console.log(snapshot.val())
      var a = snapshot._value;
      global.arr = Object.values(a);
      global.len = snapshot._childKeys.length
    });
    // if(this.state.first){
    //   this.checkLocation;
    //   this.setState({first: false});
    // }
}
checkLocation = () => {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
        ok: "YES",
        cancel: "NO",
        enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        showDialog: true, // false => Opens the Location access page directly
        openLocationServices: true, // false => Directly catch method is called if location services are turned off
        preventOutSideTouch: true, //true => To prevent the location services popup from closing when it is clicked outside
        preventBackClick: true, //true => To prevent the location services popup from closing when it is clicked back button
        providerListener: true // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
    }).then(function(success) {
        // success => {alreadyEnabled: true, enabled: true, status: "enabled"} 
        console.log(success); // success => "enabled"
        //getUserLocation;
        }
    ).catch((error) => {
        console.log(error.message);
        
    });
}

  updatestatee=()=>{
    if(global.len >0){
      for(var i = 0; i< global.len; i++){
        var coordinates = {coordinates: {latitude : global.arr[i].latitude , longitude : global.arr[i].longitude}}
        global.mark.push(coordinates);
      }
      this.setState({coords: global.mark});
    }
    else{
      //Alert.alert('fuck you')
      this.componentDidMount;
    }

    // for(var i = 0; i< global.arr.length; i++){
    //   var coordinates = {coordinates: {latitude : global.arr[i].latitude , longitude : global.arr[i].longitude}}
    //   global.mark.push(coordinates);
    // }
    // this.setState({coords: global.mark});
  }
  signOutUser = () =>{
      const out = firebase.auth();
      out.signOut();
      Actions.Loading();
      //{this.props.navigation.navigate('Login')}
  }
  menu() {
    Actions.Feedback();
  }


render() {
  const { currentUser } = this.state

  return (
        <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.menu}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>DashBoard</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.signOutUser}>
              <Icon name='log-out'/>
            </Button>
          </Right>
        </Header>
        
          <View style={styles.container}> 
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              showsUserLocation={ true }
              showsScale
              showsCompass
              showsMyLocationButton={true}
              region={ this.state.region }
            >
            {this.state.coords != null ? this.state.coords.map(marker => (
              <MapView.Marker 
                title={marker.title}
                coordinate={marker.coordinates}
                image={require('./images/tukk.png')}
              />
            )):null} 

            </MapView> 
            <View style={styles.stylebutton}>
              <TouchableOpacity style={styles.button1} onPress={this.updatestatee} >
                <Image style={{height:35, width:35}} source={require("./images/getlocation.png")} />
              </TouchableOpacity>
            </View>    
            </View>
    </Container>   
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
  },
  map: {
    marginTop: 1.5,
    zIndex: -1,
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    bottom: '-90%', 
    width: 80, 
    borderRadius: 40, 
    backgroundColor: 'yellow',
    justifyContent: 'center',
    marginLeft: 15,
    paddingRight: 10,
    paddingLeft: 10,
    bottom: '-90%',

  },
  button1:{
    justifyContent: 'center',
    alignItems: 'center',
    height:50,
    width:50,
    borderRadius:25,
    backgroundColor: '#F5FCFF',
    paddingRight: 10,
    paddingLeft: 10,
    bottom: '-120%',
  },
  stylebutton: {
    flex: 1,
    flexDirection: 'row',
  }
 });