import React, { useEffect, useState } from 'react';
import MapView, { MapCircle, Marker, Polyline } from 'react-native-maps';
import {StyleSheet, View, Text, Alert, Platform, PermissionsAndroid, LogBox} from 'react-native';
import {decode} from "@mapbox/polyline";
import Geolocation from '@react-native-community/geolocation';

const getDirections = async (startLoc, destinationLoc) => {
  try {
    //personal google API key
    const KEY = "AIzaSyDVSjivBJzi8DNBfH5WBYCkkKT3MTxN-DQ"; 
    //find key
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
    );
    let respJson = await resp.json();
    //use polyline to get the points to the desired location
    let points = decode(respJson.routes[0].overview_polyline.points);
    console.log(points);
    let coords = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1]
      };
    });
    return coords;
  } catch (error) {
    return error;
  }
};
//Render the map screen
const Map = () => {
  //A warning appears when loading Polyline to show direction
  // Bypassing warning using LogBox
  LogBox.ignoreLogs(['new NativeEventEmitter']); 
  //get current location using geolocation
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('...');
  //Request Permission
  useEffect(()=>{
    const requestLocationPermission = async () => {
      if (Platform.OS==='ios'){
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This app needs to access your location',
            },
          );
          if(granted===PermissionsAndroid.RESULTS.GRANTED){
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch(err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return ()=> {
      Geolocation.clearWatch(watchID)
    }
  }, []);
  //Method to capture current position
  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');
        //getting the Longitude from the location json
        const currentLongitude = '-20.2709621'
          //JSON.stringify(position.coords.longitude);
 
        //getting the Latitude from the location json
        const currentLatitude = '57.4763672'
          //JSON.stringify(position.coords.latitude);
 
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };
  //Method to give the location on location change
  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        setLocationStatus('You are Here');
        console.log(position);
 
        //getting the Longitude from the location json        
        const currentLongitude = '-20.2709621'
          //JSON.stringify(position.coords.longitude);
 
        //getting the Latitude from the location json
        const currentLatitude = '57.4763672'
          //JSON.stringify(position.coords.latitude);
 
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
 
        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };
  //Store coordinates
  const [coords, setCoords] = useState ([]);
  useEffect(()=> {
    //set TO and FROM directions
    getDirections("-20.2630822,57.4712116", "-20.2709621,57.4763672")
    .then(coords => setCoords(coords))
    .catch(err => console.log("Something went wrong"));
  }, []);
 return (
  <View style={styles.container}>
    {/*Render  MapView*/}
      <MapView
        style={styles.map}
        //specify the coordinates.
        initialRegion={{
          latitude: -20.2630822,
          longitude:  57.4712116,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        }}
        //showsUserLocation={true}
      >
      {coords.length > 1 && 
      <Polyline 
        coordinates={coords}
        strokeWidth={3}
        strokeColor="blue"
      />}
      {/* Put a pin on a desired location */}
      <Marker
        coordinate={{latitude: -20.2630822, longitude: 57.4712116}}
        title="Open Primary School"
        description='Quatre Bornes Branch'
        >
      </Marker>
      </MapView>
      <View>
        <Text>
          Longitude: {currentLongitude}
        </Text>
        <Text>
          Latitude: {currentLatitude}
        </Text>
      </View>
    </View>
 );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default Map;