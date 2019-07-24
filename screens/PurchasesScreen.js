import React from "react"
import { FlatList, TouchableOpacity } from "react-native"
import { Button, Footer, Screen, Tile } from "../components"

export class PurchasesScreen extends React.Component {
  state = {
    purchases: []
  }

  componentDidMount() {
    this.fetchPurchases()
  }

  async fetchPurchases() {
    const sid =
      "86e399b2961a6120b5eb884d72c2e8bdae105cc4593f40a731cfc4ce6d076ae91295e0814ff3dc0eb1f8a747380155092cbfc65840229051a10149236868fbb0"
    const resp = await fetch("http://localhost:2403/purchases", {
      Cookie: `sid=${sid}`
    })
    const purchases = await resp.json()
    this.setState({ purchases })
  }

  render() {
    const { purchases } = this.state
    return (
      <Screen
        loading={!purchases.length > 0}
        fixed
        footer={
          <Footer>
            <Button onPress={() => this.goToLogin()} text="I'm already registered" />
          </Footer>
        }
      >
        <FlatList
          data={purchases}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ flex: 0.5 }} onPress={() => this.goToDetails(item)}>
              <Tile title={item.title} imageUri={item.imageUrl} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </Screen>
    )
  }
}
