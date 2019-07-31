import React from "react"
import { View, Text } from "react-native"
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation"
import { CampListScreen } from "./screens/CampListScreen"
import { CampDetailsScreen } from "./screens/CampDetailsScreen"
import { LoginScreen } from "./screens/LoginScreen"
import { FeedScreen } from "./screens/FeedScreen"
import { Store } from "./store"
import { Provider } from "mobx-react"

const rootStore = Store.create()

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

const AppContainer = createAppContainer(AppStack)

export default class App extends React.Component {
  render() {
    return (
      <Provider rootStore={rootStore}>
        <AppContainer />
      </Provider>
    )
  }
}
