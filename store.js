import { types } from "mobx-state-tree"
import ViewShot from "react-native-view-shot"

const Item = types.model({
  title: "",
  imageUrl: "",
  price: 1
})

export const Store = types
  .model({
    cartItems: types.array(Item)
  })
  .views(self => ({
    get total() {
      const sum = self.cartItems.reduce((acc, item) => acc + Number(item.price), 0)
      return String(sum)
    }
  }))
  .actions(self => ({
    addPostToCart(item) {
      self.cartItems.push(item)
    }
  }))
