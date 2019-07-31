import React from "react"
import { View, Text } from "react-native"
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

const tempScreen = screenName => () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 40 }}>{screenName}Screen</Text>
    </View>
  )
}

const HomeStack = createStackNavigator({
  Tabs: tempScreen("Tabs")
})

const AppStack = createSwitchNavigator({
  Initial: InitialStack,
  Home: HomeStack
})

export default createAppContainer(AppStack)
