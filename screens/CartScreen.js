import React from "react"
import { FlatList, View } from "react-native"
import { Post, Screen, Footer, Button } from "../components"
import { observer, inject } from "mobx-react"

class CartScreen2 extends React.Component {
  handleCheckout = post => {
    fetch("http://localhost:2403/purchases", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie:
          "sid=29b80fad4392837a89ebda5ade817aaf20d34e4e17878d7dfd157202eae185e2b66623114f0309df3192f96c1f7233269dfdf08a113cae493824ad03c607da82"
      },
      body: JSON.stringify({ purchasedPosts: this.props.rootStore.cartItems })
    })
      .then(r => r.json())
      .then(r => console.log("RESPONSE", r))
  }

  render() {
    const { cartItems, total } = this.props.rootStore
    return (
      <Screen fixed loading={!cartItems.length > 0}>
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

export const CartScreen = inject("rootStore")(observer(CartScreen2))
