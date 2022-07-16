import { Text, View, Image, TextInput, ScrollView, StyleSheet, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SchoolLogo from '../components/SchoolLogo.jpg'
import Button from '../components/buttons';

const Reminder = ({navigation}) => {
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

  //state for text input
  const [inputs, setInputs] = useState('');

  //state will store array containing list of reminders
  const [reminders, setReminders] = useState([]);

  //function to work with onChangeText
  //set enteredText as argument
  const inputHandler = (enteredText) => {
      setInputs(enteredText);
  };

  //Take previous array, and add new element(inputs) to form a new array
  const displayReminder = () => {
    setReminders([...reminders, inputs]);
    //hide keyboard
    Keyboard.dismiss();
    //clear text field after displayed in list
    setInputs('');
  }
  //delete item in list after long press
  deleteItem = (index) => {
   setReminders([
      ...reminders.slice(0, index),
      ...reminders.slice(index+1, reminders.length)
    ])
  }
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        paddingTop: 30,
        paddingHorizontal: 20,
        paddingBottom: 10
      }}>
        {/* display image */}
        <Image
          source={SchoolLogo}
          resizeMode="contain"
          style={{width:'100%', marginTop:10, height: 100}}
        />
        {/* <Text style={{fontSize: 20, fontWeight: 'bold', paddingBottom:0}}> */}
          {/* Display login name as saved in Reminder method in Home */}
          {/* Welcome {navigation.params.saveKey} */}
        {/* </Text> */}
        <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>
          Reminders
        </Text>
        {/* Input container to enter reminder */}
        <TextInput
        style={
            {
            height: 55,
            width: '90%',
            backgroundColor: '#F3F4FB',
            flexDirection: 'row',
            paddingHorizontal: 15,
            borderWidth: 0.5,
            }
          } 
          onChangeText={inputHandler}
          placeholder="Enter Reminder"
          value = {inputs} 
        />
        {/* Click on Button to display reminders */}
        <Button 
          title = 'Add Reminder' 
          onPress={displayReminder}
          style={{width: '40%'}}
        />
        <ScrollView style={{height: '30%'}}> 
        {/* map reminders, which is an array, 
        to a text to be displayed here. Display in reverse
        so that last item is displayed first */}
          {reminders.reverse().map((reminderText, index)=>
          <View key={reminderText} style={styles.listItem}> 
            <Text 
             //delete reminder when clicked on
              onLongPress = {() => this.deleteItem(index)}
              style={{fontSize:16}}>{reminderText}</Text>
          </View>)}
        </ScrollView>
            <Button title="Logout" onPress={logout}/>
      </View>
    )
}
const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    height: 60,
    backgroundColor: '#5CFF5C',
    flexDirection: 'row',
    color: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 10,
    width: '100%',
  }
});
export default Reminder