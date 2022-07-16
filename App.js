import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/views/screens/Login';
import Register from './src/views/screens/Register';
import Home from './src/views/screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './src/views/components/Loader';
import Reminder from './src/views/screens/Reminder';
import Map from './src/views/screens/Map';
const Stack = createNativeStackNavigator();
//to authenticate user, create initial route state
const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState('');
  //load for 2 seconds when user opens app
  //then authenticate user and take to correct initial route
  React.useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);
  //method to handle authentication of user
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      //set logic based on where user is in the app
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {  //if user is logged in
          setInitialRouteName('Home');
        } else {  //navigate to login screen
          setInitialRouteName('Login');
        }
      } else { //go to register screen
        setInitialRouteName('Register');
      }
    } catch (error) {
      setInitialRouteName('Register');
    }
  };
  return (
    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Reminder" component={Reminder} />
            <Stack.Screen name="Map" component={Map} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};
export default App;