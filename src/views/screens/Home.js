import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {SafeAreaView, Text, View, TextInput, Image, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { WebView } from 'react-native-webview'; 
import Button from '../components/buttons';
import SchoolLogo from '../components/SchoolLogo.jpg'

const Home = ({navigation}) => {
  //create state to hold user data
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    //call function
    getUserData();
  }, []);
  //method to get user details
  const getUserData = async () => {
    //fet user data from storage
    const userData = await AsyncStorage.getItem('userData');
    //if data present, pass to userData
    if (userData) {
      //convert data to object and set it to the state
      setUserDetails(JSON.parse(userData));
    }
  };
  //method to log out user
  const logout = () => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({...userDetails, loggedIn: false}),
    );
    //navigate back to the login screen
    navigation.navigate('Login');
  };
  const Reminder = () => {
    // AsyncStorage.setItem(
    //   'userData',
    //   JSON.stringify({...userDetails, loggedIn: true}),
    // );
    //navigate back to the login screen
    navigation.navigate('Reminder',{
      saveKey: (userDetails?.fullname),
    });
  };
  const Map = () => {
    navigation.navigate('Map');
  };
  //methods to set states for url and final link according to user's choice
  const [url, setUrl] = useState('')
  const [name, setName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('g1');
  //use concat method to concatenate user's choice to URL
  const joinStr = () => {
    var n1 = 'http://192.168.100.179/mywebsite/grades/'
    //var test = n1.concat('',name);
    var mergeURL = n1.concat("",selectedGrade,'.html');
    //set state to final concatenated string
    setUrl(mergeURL);
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        paddingTop: 30,
        paddingHorizontal: 20,
      }}>
        <Image
          source={SchoolLogo}
          resizeMode="contain"
          style={{width:'100%', marginTop:10, height: 100}}
        />
      <Text style={{fontSize: 20, fontWeight: 'bold', paddingBottom:10}}>
        Welcome {userDetails?.fullname}
      </Text>
      {/* call the button component from button.js to log out the user */}
        <Text style={{fontSize: 18, fontWeight: 'bold', paddingBottom:0}}>Choose a Grade:</Text>
        <Picker
          style={{width:'75%'}}
          //give picker component the selected value
          selectedValue={selectedGrade}
          //set value chosen to setSelectedGrade
          onValueChange={(itemValue, itemIndex) =>
            setSelectedGrade(itemValue)
          }>
          {/* Options in the picker */}
          <Picker.Item label="Grade 1" value="g1" />
          <Picker.Item label="Grade 2" value="g2" />
          <Picker.Item label="Grade 3" value="g3" />
          <Picker.Item label="Grade 4" value="g4" />
          <Picker.Item label="Grade 5" value="g5" />
          <Picker.Item label="Grade 6" value="g6" />
        </Picker>
            <View style={styles.container}>
              <View style={styles.button}>
              <Button title="View News" onPress={joinStr} />
            </View>
            <View style={styles.button}>
              <Button title="School Map" onPress={Map} />
            </View>
          </View>
          <View style={{width:'100%', height:'40%'}}>
            <WebView style={{backgroundColor:'#cdeec5'}} source={{uri: url}}/>
          </View>
          <View style={styles.container}>
              <View style={styles.button}>
              <Button title="Reminder" onPress={Reminder} />
            </View>
            <View style={styles.button}>
              <Button title="Logout" onPress={logout} />
            </View>
          </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: '40%',
    height: 40,
    paddingLeft: 5,
    paddingRight: 5
  }
});
export default Home;