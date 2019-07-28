import React from "react"
import { FlatList, View } from "react-native"
import { Post, Screen, Footer, Button, Text } from "../components"
import { observer, inject } from "mobx-react"

class Cart extends React.Component {
  handleCheckout = post => {
    const { navigation, rootStore } = this.props
    const { userId, cartItems } = rootStore
    fetch("https://campminder-training-api.herokuapp.com/purchases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userId
      },
      body: JSON.stringify({ purchasedPosts: cartItems })
    })
      .then(r => (r.ok ? r.json() : alert("There was a problem processing your order")))
      .then(r => {
        navigation.navigate("Purchases")
        rootStore.clearCart()
      })
  }

  render() {
    const { cartItems, total } = this.props.rootStore
    const noItems = !cartItems.length > 0
    if (noItems) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>You have nothing in your cart</Text>
        </View>
      )
    }
    return (
      <Screen fixed>
        <FlatList
          contentContainerStyle={{ paddingVertical: 20 }}
          data={cartItems}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item }) => (
            <Post
              quantity={item.quantity}
              title={item.title}
              imageUrl={item.imageUrl}
              style={{ borderWidth: 1, borderColor: "lightgray", padding: 20, borderRadius: 5 }}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
        <Footer>
          <Button
            onPress={this.handleCheckout}
            text={`Purchase ${cartItems.length} items for $${total}`}
          />
        </Footer>
      </Screen>
    )
  }
}

export const CartScreen = inject("rootStore")(observer(Cart))
