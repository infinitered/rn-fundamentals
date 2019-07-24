import React from "react"
import { FlatList, View, Modal, Image } from "react-native"
import { Post, Screen, Text, Footer, Button } from "../components"
import { TextInput } from "react-native-gesture-handler"
import { observer, inject } from "mobx-react"

const DEFAULT_SELECTED_POST = {
  size: `4" x 6"`,
  quantity: "1",
  price: 0,
  imageUrl: "",
  title: "",
  id: ""
}

class Feed extends React.Component {
  state = {
    posts: [],
    showModal: false,
    selectedPost: DEFAULT_SELECTED_POST
  }

  componentDidMount() {
    this.fetchPosts()
  }

  async fetchPosts() {
    const resp = await fetch("http://localhost:2403/posts")
    const posts = await resp.json()
    this.setState({ posts })
  }

  handleSelectPost = post => {
    const { imageUrl, title, id, price } = post
    const selectedPost = { ...this.state.selectedPost, title, imageUrl, id, price }
    this.setState(state => ({ showModal: !state.showModal, selectedPost }))
  }

  addPostToCart = () => {
    this.props.rootStore.addPostToCart(this.state.selectedPost)
    this.setState({ showModal: false, selectedPost: DEFAULT_SELECTED_POST })
  }

  renderModal = () => {
    const { quantity, imageUrl, title, price } = this.state.selectedPost
    return (
      <Modal animationType="slide" transparent>
        <Screen
          safeAreaStyle={{ backgroundColor: "#000000a1" }}
          style={{ flex: 1, backgroundColor: "#000000a1" }}
          contentContainerStyle={{ justifyContent: "center", flex: 1 }}
        >
          <Text
            style={{ fontSize: 40, color: "lightgray", position: "absolute", top: 20, right: 20 }}
            onPress={() => this.setState({ showModal: false })}
          >
            X
          </Text>
          <View
            style={{
              height: 300,
              width: "90%",
              borderRadius: 5,
              justifyContent: "center",
              alignSelf: "center",
              paddingHorizontal: 20,
              paddingTop: 20,
              backgroundColor: "#f2f2f2"
            }}
          >
            <Image
              style={{ width: "100%", height: "50%", borderRadius: 5 }}
              source={{ uri: imageUrl }}
            />
            <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-around" }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{title}</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                ${(price * quantity).toString()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                flex: 1,
                alignItems: "center"
              }}
            >
              <View>
                <Text>
                  <Text style={{ color: "black", marginRight: 5 }}>X</Text> 4" x 6"
                </Text>
                <Text style={{ paddingLeft: 10 }}> 8" x 10"</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Text>Quantity: </Text>
                <TextInput
                  style={{
                    height: 30,
                    width: 30,
                    borderWidth: 1,
                    borderColor: "lightgray",
                    paddingLeft: 5
                  }}
                  value={quantity}
                  onChangeText={quantity =>
                    this.setState(state => ({ selectedPost: { ...state.selectedPost, quantity } }))
                  }
                />
              </View>
            </View>
          </View>
          <Footer>
            <Button onPress={this.addPostToCart} text="Add post to cart" />
          </Footer>
        </Screen>
      </Modal>
    )
  }

  render() {
    const { posts, showModal } = this.state
    return (
      <Screen fixed loading={!posts.length > 0}>
        <FlatList
          contentContainerStyle={{ paddingVertical: 20 }}
          data={posts}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item }) => (
            <Post
              title={item.title}
              imageUrl={item.imageUrl}
              quantity={item.quantity}
              price={item.price}
              actionText="Purchase"
              onPress={() => this.handleSelectPost(item)}
              style={{ borderWidth: 1, borderColor: "lightgray", padding: 20, borderRadius: 5 }}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
        {showModal && this.renderModal()}
      </Screen>
    )
  }
}

export const FeedScreen = inject("rootStore")(observer(Feed))
