//file containing status bar props
//props below set as default for all screens
import { StatusBar } from 'react-native'
import React, { Component } from 'react'
const Statusbar = () => {
  return (
      <StatusBar 
        barStyle="dark-content"
        hidden = {false}
        backgroundColor = "#00BCD4"
        translucent = {true}
      />
  )
}
export default Statusbar;