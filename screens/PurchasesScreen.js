import React from "react"
import { FlatList, TouchableOpacity, AsyncStorage } from "react-native"
import { Screen, Tile, Button, Footer } from "../components"
import { observer, inject } from "mobx-react"

export class Purchases extends React.Component {
  state = {
    purchases: []
  }

  componentDidMount() {
    this.fetchPurchases()
  }

  async fetchPurchases() {
    const { token, userId } = this.props.rootStore
    const resp = await fetch(`http://localhost:2403/purchases?userId=${userId}`, {
      Cookie: `sid=${token}`
    })
    const response = await resp.json()
    const purchases = response.map(r => r.purchasedPosts).flat() // to combine nested arrays into one purchases array
    this.setState({ purchases })
  }

  handleLogout = () => {
    fetch("http://localhost:2403/parents/logout")
    AsyncStorage.clear()
    this.props.navigation.navigate("Camps")
  }

  render() {
    const { purchases } = this.state
    return (
      <Screen loading={!purchases.length > 0} fixed>
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
