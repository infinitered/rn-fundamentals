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
    const sid = ""
    const resp = await fetch("http://localhost:2403/camps", {
      ...(sid && { Cookie: `sid=${sid}` })
    })
    const camps = await resp.json()
    this.setState({ camps })
  }

  goToDetails(camp) {
    // fetch("http://localhost:2403/purchases", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     items: ["3", "4"]
    //     // userId: "345"
    //   })
    // })
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
        }
      >
        {camps.length > 0 ? (
          <FlatList
            data={camps}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ flex: 0.5 }} onPress={() => this.goToDetails(item)}>
                <Tile title={item.name} imageUri={item.imageUrl} />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </Screen>
    )
  }
}
