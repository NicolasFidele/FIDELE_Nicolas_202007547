//input component is gonna be used in verious screens
//put in separate folder and import whenever needed
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//create method which will be called in other screens
//set props for Input
//...props will receive any other props not included inside the Input function
const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  //set state to hide/show the text inside password input field
  const [hidePassword, setHidePassword] = React.useState(password);
  //create state to keep track of input
  //input field will change based on focus or error
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    //Create view that will hold the labels and the input fields
    //As well as error messages when during validation
    <View style={{marginBottom: 20}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            // set border color if there's error / focused
            borderColor: error
              ? 'red'
              : isFocused
              ? '#7978B5'
              : '#F3F4FB',
            alignItems: 'center',
          },
        ]}>
        <Icon
          name={iconName}
          style={{color: '#7978B5', fontSize: 22, marginRight: 10}}
        />
        <TextInput
          selectTextOnFocus={false}
          autoCorrect={false}
          //onFocus --> any props called in the main screens will be passed here
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          //set state back to false when not focused
          onBlur={() => setIsFocused(false)}
          //use secureTextEntry prop set to true to hide text when passing
          //the hidePassword State
          secureTextEntry={hidePassword}
          style={{color: '#7978B5', flex: 1}}
          // with ...props, any props can be passed into input
          //for e.g, placeholder can be used on one input and not used in another
          {...props}
        />
        {/* Icon component used to toggle hide/show password 
        Use Logical AND to use props in input only if password prop is used*/}
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: '#7978B5', fontSize: 22}}
          />
        )}
      </View>
      {/* add error component 
      Logical AND to display if error is true*/}
      {error && (
        <Text style={{marginTop: 7, color: 'red', fontSize: 12}}>
          {error}
        </Text>
      )}
    </View>
  );
};
//create labels for label and inputContainer
const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 20,
    color: '#BABBC3',
    fontWeight: 'bold'
  },
  inputContainer: {
    height: 55,
    backgroundColor: '#F3F4FB',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
  },
});
export default Input;