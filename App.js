import React from "react"
import { createAppContainer, createStackNavigator } from "react-navigation"
import { CampListScreen } from "./screens/CampListScreen"
import { CampDetailsScreen } from "./screens/CampDetailsScreen"

const AppStack = createStackNavigator(
  {
    Camps: CampListScreen,
    Camp: CampDetailsScreen
  },
  {
    defaultNavigationOptions: () => {
      return {
        headerTitle: "CampMinder"
      }
    }
  }
)

export default createAppContainer(AppStack)
