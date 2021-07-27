import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Image, 
  ImageBackground, 
  TouchableOpacity, 
  StatusBar, 
  Platform,
  Alert
  } from 'react-native';
import {Component} from 'react';
import MapView, { Marker } from 'react-native-maps'
import axios from "axios"
export default class ISSLocationScreen extends Component{
    constructor(props){
      super(props);
      this.state={
        location: {}
      }
    }
  componentDidMount(){
    this.getISSLocation()
  }

  getISSLocation=()=>{
    axios.get("https://api.wheretheiss.at/v1/satellites/25544").then(response=>{this.setState({
      location: response.data
    })}).catch(error=>{Alert.alert(error.message)})
  }
    render(){
         if (Object.keys(this.state.location).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Loading</Text>
                </View>
            )
        } else {
    
        return( 
          <View style ={styles.container}>  
        <SafeAreaView style= {styles.androidSafeArea}/>
           <ImageBackground style ={{flex:1, resizeMode: 'cover'}} source = {require('../assets/iss_bg.jpg')}>
           <View style = {styles.title}>
          <Text style = {{color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 40, fontFamily: 'AMATIC SC'}}>ISS Location</Text>
          </View>
          <View style={styles.map}>
            <MapView style = {styles.map2} region={{latitude: this.state.location.latitude, longitude: this.state.location.longitude, latitudeDelta: 100, longitudeDelta: 100}}>
            <Marker coordinate={{latitude: this.state.location.latitude, longitude: this.state.location.longitude}}>
            <Image
            source={require('../assets/iss_icon.png')}
            style = {styles.image}
            />
            </Marker>
            </MapView>
            
          </View>
          <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>Latitude: {this.state.location.latitude}</Text>
                            <Text style={styles.infoText}>Longitude: {this.state.location.longitude}</Text>
                            <Text style={styles.infoText}>Altitude (KM): {this.state.location.altitude}</Text>
                            <Text style={styles.infoText}>Velocity (KM/H): {this.state.location.velocity}</Text>
                        </View> 
          </ImageBackground> 
          </View> 
           
      )
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  androidSafeArea:{
    marginTop:Platform.OS=="android"? StatusBar.currentHeight: 0
  }, 
  title:{
    flex:0.1,
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  map:{
    flex: 0.6
  }, 
  map2: {
    width: '100%',
    height: '100%'

  },
  image:{
    width: 50,
    height: 50
  }, 
  infoContainer:{
     flex: 0.2,
        backgroundColor: 'white',
        marginTop: -10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30
  },
  infoText:{
    fontSize: 15,
        color: "black",
        fontWeight: "bold"
  }
})
