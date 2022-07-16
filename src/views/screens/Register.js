import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View,Text,SafeAreaView,Keyboard,ScrollView,Alert,Image} from 'react-native';

import Button from '../components/buttons';
import Input from '../components/input';
import Loader from '../components/Loader';
import SchoolLogo from '../components/SchoolLogo.jpg'

//use navigation prop to navigate between pages
const Register = ({navigation}) => {
  //create state to keep track of text inside input fields
  //create state called input
  const [inputs, setInputs] = React.useState
  //create object with 4 properties - these will store users inputs
  ({
    email: '',
    fullname: '',
    phone: '',
    password: '',
  });
  //Create state for Errors
  const [errors, setErrors] = React.useState({});

  //create state for loader (show/hide)
  const [loading, setLoading] = React.useState(false);

  //validate function for input validation
  const validate = () => {
    //hide keyboard when user presses button
    Keyboard.dismiss();
    //if there's error, app will not let user submit input
    //if isValid is true, register user, else, not registratioin
    let isValid = true;

    //if email empty
    //each error will trigger the handleError function
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
      //check if email is valid
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }
    //check if name not empty
    if (!inputs.fullname) {
      handleError('Please input fullname', 'fullname');
      isValid = false;
    }
    //check if phone not empty
    if (!inputs.phone) {
      handleError('Please input phone number', 'phone');
      isValid = false;
    }
    //check if password not empty
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;

    //check if password more than 5 characters  
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }
    //if validation passed, call register function
    if (isValid) {
      register();
    }
  };

  //create method to register the user
  const register = () => {
    //call loader state, set to true when registering
    setLoading(true);
    //creaate method to set a timeOut to simulate activityIndicator
    setTimeout(() => {
      try {
        //save data to the user's device
        setLoading(false);
        //userData is a key used to retrieve the data when it's needed
        //(inputs) is the user's input, turned to String using JSON.stringify method
        AsyncStorage.setItem('userData', JSON.stringify(inputs));
        //move to the login screen
        navigation.navigate('Login');
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 3000);
  };

  //create function to bind user input to the validate state
  const handleOnchange = (text, input) => {
    //take user input and set the property attached to it to the text entered
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  //create state for errors - takes error message and display with the input
  //where error needs to be shown
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    //style safearea view component
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1, paddingBottom:10}}>
    {/* Call the loader (from loader.js) and pass the loading state*/}
      <Loader visible={loading}/>
      {/* scroll in case inputs overflow */}
      <ScrollView
        contentContainerStyle={{paddingTop: 0, paddingHorizontal: 20}}>
        <Image
          source={SchoolLogo}
          resizeMode="contain"
          style={{width:'100%', marginTop:20, height: 100}}
        />
        {/* Text component for the Title of the page */}
        <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>
          Register
        </Text>
        <View style={{marginVertical: 20}}>
        {/* input component for user to input details 
        -- Input field props imported from components folder
        -- Input for name*/}
          <Input
            //set the text entered to the correct  property (email)
            onChangeText={text => handleOnchange(text, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            //add error to input
            error={errors.email}
            //clear error when focus is put again on the input field
            onFocus={() => handleError(null, 'email')}
          />
          {/* Input for name */}
          <Input
            onChangeText={text => handleOnchange(text, 'fullname')}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullname}
            onFocus={() => handleError(null, 'fullname')}
          />
          {/* Input for phone number */}
          <Input
            onChangeText={text => handleOnchange(text, 'phone')}
            keyboardType="numeric"
            onFocus={() => handleError(null, 'phone')}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.phone}
          />
          {/* Input for password */}
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          {/* pass through validation before moving on 
          -- call the validate function*/}
          <Button title="Register" onPress={validate} />

          {/* touchable text to get to login page */}
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Already have an account? LOGIN
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Register;