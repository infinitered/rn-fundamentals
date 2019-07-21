import React from "react"
import { FlatList, TouchableOpacity } from "react-native"
import { Button, Footer, Screen, Text, Tile } from "../components"

export class CampListScreen extends React.Component {
  state = {
    camps: []
  }

  componentDidMount() {
    this.fetchCamps()
  }

  async fetchCamps() {
    const resp = await fetch("http://localhost:3030/camps")
    const { data } = await resp.json()
    this.setState({
      camps: [
        { _id: 1, name: "Camp Awesome", thumbnail: "https://facebook.github.io/react-native/docs/assets/favicon.png" },
        { _id: 2, name: "Camp Awesome", thumbnail: "https://facebook.github.io/react-native/docs/assets/favicon.png" },
        { _id: 3, name: "Camp Awesome", thumbnail: "https://facebook.github.io/react-native/docs/assets/favicon.png" },
        { _id: 4, name: "Camp Awesome", thumbnail: "https://facebook.github.io/react-native/docs/assets/favicon.png" },
        { _id: 5, name: "Camp Awesome", thumbnail: "https://facebook.github.io/react-native/docs/assets/favicon.png" },
        { _id: 6, name: "Camp Awesome", thumbnail: "https://facebook.github.io/react-native/docs/assets/favicon.png" },
        { _id: 7, name: "Camp Awesome", thumbnail: "https://facebook.github.io/react-native/docs/assets/favicon.png" },
        { _id: 8, name: "Camp Awesome", thumbnail: "https://facebook.github.io/react-native/docs/assets/favicon.png" },
        { _id: 9, name: "Camp Awesome", thumbnail: "https://facebook.github.io/react-native/docs/assets/favicon.png" },
      ]
    })
  }

  goToDetails(camp) {
    this.props.navigation.navigate("Camp", { camp })
  }

  goToLogin() {
    this.props.navigation.navigate("SignIn")
  }

  render() {
    const { camps } = this.state
    return (
      <Screen
        fixed
        footer={
          <Footer>
            <Button onPress={() => this.goToLogin()} text="I'm already registered" />
          </Footer>
        }>
        {camps.length > 0
          ? <FlatList
              data={camps}
              renderItem={({ item }) => (
                <TouchableOpacity style={{ flex: 0.5 }} onPress={() => this.goToDetails(item)}>
                  <Tile title={item.name} imageUri={item.thumbnail} />
                </TouchableOpacity>
              )}
              keyExtractor={item => item._id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
            />
          : <Text>Loading...</Text>
        }
      </Screen>
    )
  }
}