import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity,StatusBar, Platform, ImageBackground, Image} from 'react-native';
import {Component} from 'react';

export default class HomeScreen extends Component{
    render(){ 
         
      
        return( 
          <View style ={{flex: 1}}>  
        <SafeAreaView style={{marginTop:Platform.OS=="android"? StatusBar.currentHeight: 0}}/>
           <ImageBackground style ={{flex:1, resizeMode: 'cover'}} source = {require('../assets/iss_bg.jpg')}>
          <Text style = {{color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 40, fontFamily: 'AMATIC SC'}}>ISS-Tracker</Text>
          <TouchableOpacity style ={{flex:2, alignItems: 'center', justifyContent: 'center', marginLeft: 50, marginRight: 50, marginTop:50, backgroundColor: 'lightgray', borderRadius: 10, borderWidth: 3}} onPress ={()=>this.props.navigation.navigate('ISSLocation')}>  
          <Image   
            source={require('../assets/iss_icon.png')}
             style = {{width: 130, height:130}}  
          />    
            <Text style = {{color:'black', fontWeight: 'bold'}}>ISS Location</Text>
          </TouchableOpacity>    
               
          <TouchableOpacity style ={{flex:2, alignItems: 'center', justifyContent: 'center', marginLeft: 50, marginRight: 50, marginTop:50, backgroundColor: 'lightgray', borderRadius: 10, borderWidth: 3}} onPress ={()=>this.props.navigation.navigate('Meteor')}>  
          <Image  
            source={require('../assets/meteor_icon.png')} 
             style = {{width: 130, height: 130}}
          /> 
            <Text style = {{color:'black', fontWeight: 'bold'}}>Meteors</Text>
          </TouchableOpacity>
          </ImageBackground> 
          </View>  
       
        )
    } 
}
