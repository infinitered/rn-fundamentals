import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation"
import {
  CampDetailsScreen,
  CampListScreen,
  FeedScreen,
  SignInScreen,
  SignUpScreen,
} from "./screens"

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: "#3B8686",
  },
  headerTintColor: "white",
  headerTitle: "CampMinder",
}

const createPlaceholderScreen = (text) => () =>
  <View style={styles.container}><Text>{text}</Text></View>

const AppNavigator = createStackNavigator({
  SignUp: createStackNavigator({
    Camps: CampListScreen,
    Camp: CampDetailsScreen,
    Register: SignUpScreen,
  }, {
    defaultNavigationOptions,
  }),
  SignIn: createStackNavigator({
    SignInScreen,
  }, {
    defaultNavigationOptions,
  }),
  Main: createBottomTabNavigator({
    Feed: createStackNavigator({
      FeedScreen,
    }, {
      defaultNavigationOptions,
    }),
    Cart: createStackNavigator({
      CartScreen: createPlaceholderScreen("Cart"),
    }, {
      defaultNavigationOptions,
    }),
    Settings: createStackNavigator({
      SettingsScreen: createPlaceholderScreen("Settings"),
    }, {
      defaultNavigationOptions,
    })
  })
}, {
  mode: "modal",
  headerMode: "none",
})

const App = createAppContainer(AppNavigator)

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
