import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './android/src/navigation/Appnavigator';
import { Provider } from 'react-redux';
import MyStore from './android/src/redux/Store';


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