import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, StatusBar, Platform, FlatList, Dimensions } from 'react-native';
import axios from 'axios'
import {Component} from 'react';

export default class MeteorScreen extends Component{
  constructor(){
    super()
    this.state={ 
      meteor: {
      }
    }
  }
  //threat score = [(MinD + MaxD)/2] / Dis. 
  componentDidMount(){
    this.getMeteors() 
  } 
  getMeteors=()=>{
    axios.get('https://api.nasa.gov/neo/rest/v1/feed?api_key=wJfiGyHBoDhB0htr79j0ZoO4UGOsXfghJehwyGVN').then(response=>{
      this.setState({
        meteor: response.data.near_earth_objects  
      })   
    })  
  }
  keyExtractor =(item, index)=>{
    index.toString()}
  
  renderItem = ({
    item
  })=>{
    let meteors = item
    let bgImage, speed, size 
    if(meteors.threatScore <= 30){
      bgImage = require('../asset/meteor_bg1.png')
      size = 100
      speed = require('../asset/meteor_speed1.gif')
    } else if (meteors.threatScore <= 75){
       bgImage = require('../asset/meteor_bg2.png')
      size = 150
      speed = require('../asset/meteor_speed2.gif')
    } else{
       bgImage = require('../asset/meteor_bg3.png')
      size = 200
      speed = require('../asset/meteor_speed3.gif')
    }
    return(
      <View>
        <ImageBackground source={bgImage} style ={styles.bgImages}>
          <View style ={styles.gContainer}>
            <Image
              source={speed}
              style = {{width: size, height: size, alignSelf : 'center'}}
            />
            <View>
              <Text style = {[styles.cardTitle, {marginTop: 400, marginLeft: 50}]}>{item.name}</Text>
              <Text style = {[styles.cardText, {marginTop: 20, marginLeft: 50}]}>Closest to Earth - {item.close_approach_data[0].close_approach_date_full}</Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>Minimum Diameter (KM) - {item.estimated_diameter.kilometers.estimated_diameter_min}</Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>Maximum Diameter (KM) - {item.estimated_diameter.kilometers.estimated_diameter_max}</Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>Velocity (KM/H) - {item.close_approach_data[0].relative_velocity.kilometers_per_hour}</Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>Missing Earth by (KM) - {item.close_approach_data[0].miss_distance.kilometers}</Text>
            </View>
          </View>
        </ImageBackground>
      </View> 
    )

  }
    render(){
        if(Object.keys(this.state.meteor).length == 0){ 
          return( 
            <Text>Loading...</Text>  
          )  
        } else{  
            let meteorArray = Object.keys(this.state.meteor).map(date=>{
            return this.state.meteor[date]             
            })
            let meteors = [].concat.apply([], meteorArray) 
            meteors.forEach(function(element){ 
            let dia = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max)/2
              let threatScore = (dia/element.close_approach_data[0].miss_distance.kilometers)*1000000000
              element.threatScore = threatScore
            }) 

            meteors.sort(function(a,b){
              return(
                b.threatScore - a.threatScore
              )
            })
            meteors = meteors.slice(0,5)

          return( 
            <View style ={styles.container}> 
              <SafeAreaView style ={styles.androidSafeArea}/>
              <FlatList 
                keyExtractor={this.keyExtractor}
                data = {meteors}
                renderItem = {this.renderItem}
                horizontal = {true}
              />
              
            </View>
          )
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  androidSafeArea:{
    marginTop:Platform.OS=="android"? StatusBar.currentHeight: 0
  },
  bgImages: {
    flex: 1,
    resizeMode : 'cover',
    height: Dimensions.get('window').height,
    width : Dimensions.get('window').width
  },
  gContainer : {
    justifyContent : 'center',
    alignItems : 'center',
    flex : 1
  },
  cardTitle : {
    fontSize : 20,
    fontWeight : 'bold',
    marginBottom : 10,
    color : 'white'
  },
  cardText : {
    color: 'white'
  }
})