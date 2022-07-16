import React, { useEffect, useRef } from 'react';
import {View, StyleSheet,Text,SafeAreaView,Keyboard,Alert,Animated, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import Button from '../components/buttons';
import Input from '../components/input';
import Statusbar from '../components/statusbar';
import SchoolLogo from '../components/SchoolLogo.jpg';

const Login = ({navigation}) => {
  //create state to keep track of text inside input fields
  const [inputs, setInputs] = React.useState({email: '', password: ''});
  //Create state for Errors
  const [errors, setErrors] = React.useState({});
  //create state for loader (show/hide)
  const [loading, setLoading] = React.useState(false);

  //Method to validate inputs
  const validate = async () => {
    let isValid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };
  const login = () => {
    //show the activity Indicator
    setLoading(true);
    //async function - get async storage to fetch data from the device
    setTimeout(async () => {
      setLoading(false); //hide login screen
      //get data from device
      //create variable userData where user's data will be saved
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        //check if data passed is valid
        //convert data back to object using JSON.parse
        //(as data was stringified in register)
        userData = JSON.parse(userData);
        if (
          //check if user's input is valid
          inputs.email == userData.email &&
          inputs.password == userData.password
        ) {
          //if valid, move to Home
          navigation.navigate('Home');
          //set data back to device, in String format, to confirm login
          AsyncStorage.setItem(
            'userData',
            JSON.stringify({...userData, loggedIn: true}),
          );
          //if details not valid
        } else {
          Alert.alert('Error', 'Invalid Details');
        }
        //if data not found in storage
      } else {
        Alert.alert('Error', 'User does not exist');
      }
    }, 3000);
  };
  //bind input to validate state
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  //method to handle errors and display where error should be
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  //set up animation - from value 0 to 0.5, then from 0.5 to 1
  const progress = useRef(new Animated.Value(0.5)).current;
  const scale = useRef(new Animated.Value(1)).current;
  //fun effect for animation
  useEffect(() => {
    //create animation
    //loop three times
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.spring(progress, { toValue: 1, useNativeDriver: true }),
          Animated.spring(progress, { toValue: 0.5, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.spring(scale, { toValue: 2, useNativeDriver: true }),
          Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
        ]),
      ]),
      { iterations: 2 }
    ).start();
  }, []);
  //run effect for text fade in
  useEffect(() => {
      fadeIn();
  }, [])
  //animate text
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 5000
    }).start();
  }
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Statusbar/>
      <Loader visible={loading} />
      <View style={{paddingTop: 50, paddingHorizontal: 25}}>
        <Image
          source={SchoolLogo}
          resizeMode="contain"
          style={{width:'100%', marginTop:20, height: 100}}
        />
        <View style={{alignItems:'center', paddingTop: 20}}>
        {/* Set props for special animation */}
          <Animated.View
            style={[
              styles.square,
              {
                borderRadius: progress.interpolate({
                  inputRange: [0.5, 1],
                  outputRange: [SIZE / 4, SIZE / 2],
                }),
                opacity: progress,
                transform: [
                  { scale },
                  {
                    rotate: progress.interpolate(
                      {
                        inputRange: [0.5, 1],
                        outputRange: ['3.142rad', '6.284rad'],
                      }
                    ),
                  },
                ],
              },
            ]}
          />
          {/* Set props for text animation */}
          <Animated.View style={[
            {
              opacity: fadeAnim
            }
            ]}>
            <Text style = {
              {
                color: '#000', 
                fontSize: 40, 
                fontWeight: 'bold', 
                paddingTop: 10
              }
            }>Sign In</Text>
          </Animated.View>
        </View>
        <Text style={{
            color: '#BABBC3', 
            fontSize: 18, 
            marginVertical: 10,
            fontWeight:'bold'
            }}>
          Please Enter your Email and Password.
        </Text>
        {/* Input component for user inputs */}
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter Email"
            error={errors.email}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter Password"
            error={errors.password}
            password
          />
          {/* Validate before logging */}
          <Button title="Sign In" onPress={validate} />
          {/* Go to register screen if not a user */}
          <Text
            onPress={() => navigation.navigate('Register')}
            style={{
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 18,
            }}>
            No Account? 
            REGISTER
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const SIZE = 40.0
const styles = StyleSheet.create({
  square: {
    width:50, 
    height: SIZE, 
    backgroundColor:"#00BCD4",
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: "powderblue"
  }
})
export default Login;