//Simulate activity indicator using loader.js
import React from 'react';
import {
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
//set default show loader to false
const Loader = ({visible = false}) => {
  //add height and width - passed to the component's style
  const {width, height} = useWindowDimensions();
  return (
    //make loader visible before returning this view component
    visible && (
      <View style={[style.container, {height, width}]}>
        <View style={style.loader}>
          <ActivityIndicator size="large" color={'#5D5FEE'} />
          <Text style={{marginLeft: 10, fontSize: 18}}>Loading...</Text>
        </View>
      </View>
    )
  );
};
const style = StyleSheet.create({
  //styling the activity indicator
  loader: {
    height: 70,
    backgroundColor: '#fff',
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  //styling the loader's container
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
});
export default Loader;