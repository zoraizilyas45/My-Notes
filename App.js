import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import MyStack from './src/navigation/Appnavigator';
import MyStore from './src/redux/Store';


const App = () => {
  return (
    <View style={{flex:1}}>
      <Provider store={MyStore}>
      <NavigationContainer>
        <MyStack/>
      </NavigationContainer>
      </Provider>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})