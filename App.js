import React from "react"
import { View, Text } from "react-native"
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation"
import { CampListScreen, CampDetailsScreen, LoginScreen, FeedScreen } from "./screens"

const tempScreen = screenName => () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 40 }}>{screenName}Screen</Text>
    </View>
  )
}

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

const HomeStack = createBottomTabNavigator({
  Feed: FeedScreen,
  Cart: tempScreen("Cart")
})

const AppStack = createSwitchNavigator({
  Initial: InitialStack,
  Home: HomeStack
})

export default createAppContainer(AppStack)
