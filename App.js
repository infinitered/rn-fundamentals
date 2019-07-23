import React from "react"
import { StyleSheet, Text, View } from "react-native"
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation"
import {
  CampDetailsScreen,
  CampListScreen,
  FeedScreen,
  SignInScreen,
  SignUpScreen
} from "./screens"
import { Store } from "./store"
import { Provider } from "mobx-react"

const rootStore = Store.create()
console.log("STORE", rootStore)

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: "#3B8686"
  },
  headerTintColor: "white",
  headerTitle: "CampMinder",
  params: { rootStore }
}

const createPlaceholderScreen = text => () => (
  <View style={styles.container}>
    <Text>{text}</Text>
  </View>
)

const AppNavigator = createStackNavigator(
  {
    SignUp: createStackNavigator(
      {
        Camps: CampListScreen,
        Camp: CampDetailsScreen,
        Register: SignUpScreen
      },
      {
        defaultNavigationOptions
      }
    ),
    SignIn: createStackNavigator(
      {
        SignInScreen
      },
      {
        defaultNavigationOptions
      }
    ),
    Main: createBottomTabNavigator({
      Feed: createStackNavigator(
        {
          FeedScreen
        },
        {
          defaultNavigationOptions
        }
      ),
      Cart: createStackNavigator(
        {
          CartScreen: createPlaceholderScreen("Cart")
        },
        {
          defaultNavigationOptions
        }
      ),
      Settings: createStackNavigator(
        {
          SettingsScreen: createPlaceholderScreen("Settings")
        },
        {
          defaultNavigationOptions
        }
      )
    })
  },
  {
    mode: "modal",
    headerMode: "none"
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
  render() {
    return (
      <Provider rootStore={rootStore}>
        <AppContainer />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
