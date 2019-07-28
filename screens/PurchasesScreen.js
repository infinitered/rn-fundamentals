import React from "react"
import { FlatList, TouchableOpacity, AsyncStorage, View } from "react-native"
import { Screen, Tile, Button, Footer, Text } from "../components"
import { observer, inject } from "mobx-react"

export class Purchases extends React.Component {
  state = {
    purchases: []
  }

  componentDidMount() {
    this.fetchPurchases()
  }

  async fetchPurchases() {
    const { userId } = this.props.rootStore
    const resp = await fetch("https://campminder-training-api.herokuapp.com/purchases", {
      headers: {
        Authorization: userId
      }
    })
    const response = await resp.json()
    const purchases = response.map(r => r.purchasedPosts).flat() // to combine nested arrays into one purchases array
    this.setState({ purchases })
  }

  handleLogout = () => {
    fetch("https://campminder-training-api.herokuapp.com/parents/logout")
    AsyncStorage.clear()
    this.props.navigation.navigate("Camps")
  }

  render() {
    const { purchases } = this.state
    const noPurchases = !purchases.length > 0
    if (noPurchases) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>You have purchased any posts yet</Text>
          <Footer>
            <Button onPress={this.handleLogout} text="Logout" />
          </Footer>
        </View>
      )
    }
    return (
      <Screen fixed>
        <FlatList
          data={purchases}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ flex: 0.5 }} onPress={() => alert(item.title)}>
              <Tile title={item.title} imageUri={item.imageUrl} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
        <Footer>
          <Button onPress={this.handleLogout} text="Logout" />
        </Footer>
      </Screen>
    )
  }
}

export const PurchasesScreen = inject("rootStore")(observer(Purchases))
