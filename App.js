import React from "react"
import { View } from "react-native"
import { createSwitchNavigator, createAppContainer, createStackNavigator } from "react-navigation"
import { CampListScreen } from "./screens/CampListScreen"
import { CampDetailsScreen } from "./screens/CampDetailsScreen"
import { LoginScreen } from "./screens/LoginScreen"

const InitialStack = createStackNavigator(
  {
    Camps: CampListScreen,
    Login: LoginScreen,
    Camp: CampDetailsScreen
  },
  {
    defaultNavigationOptions: {
      headerTitle: "CampMinder"
    }
  }
)

const HomeStack = createStackNavigator({
  Temp: () => <View style={{ flex: 1, backgroundColor: "green" }} />
})

const AppStack = createSwitchNavigator({
  Initial: InitialStack,
  Home: HomeStack
})

export default createAppContainer(AppStack)
