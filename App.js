import React from "react"
import { createAppContainer, createStackNavigator } from "react-navigation"
import { CampListScreen, CampDetailsScreen } from "./screens"

const AppStack = createStackNavigator(
  {
    Camps: CampListScreen,
    Camp: CampDetailsScreen
  },
  {
    defaultNavigationOptions: {
      headerTitle: "CampMinder"
    }
  }
)

export default createAppContainer(AppStack)
