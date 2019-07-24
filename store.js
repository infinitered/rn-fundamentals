import { types } from "mobx-state-tree"

const Item = types.model({
  title: "",
  imageUrl: "",
  price: 1,
  quantity: "0",
  id: "",
  price: 0
})

export const Store = types
  .model({
    cartItems: types.array(Item),
    token: types.maybe(types.string),
    userId: types.maybe(types.string)
  })
  .views(self => ({
    get total() {
      const sum = self.cartItems.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
      )
      return String(sum)
    }
  }))
  .actions(self => ({
    addPostToCart(item) {
      self.cartItems.push(item)
    },
    setToken(token) {
      self.token = token
    },
    setUserId(userId) {
      self.userId = userId
    },
    clearCart() {
      self.cartItems.replace([])
    }
  }))
