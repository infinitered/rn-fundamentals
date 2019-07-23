import React from "react"
import { FlatList, View, Modal, Image } from "react-native"
import { Post, Screen, Text, Footer, Button } from "../components"
import { TextInput } from "react-native-gesture-handler"
import { observer, inject } from "mobx-react"

export class FeedScreen2 extends React.Component {
  state = {
    posts: [],
    showModal: false,
    selectedPost: {
      size: `4" x 6"`,
      quantity: "1",
      imageUrl: "",
      title: "",
      id: ""
    }
  }

  componentDidMount() {
    this.fetchPosts()
    console.log("HEYYY", this.props.rootStore.total)
  }

  async fetchPosts() {
    const resp = await fetch("http://localhost:2403/posts")
    const posts = await resp.json()
    this.setState({ posts })
  }

  handleSelectPost = post => {
    const { imageUrl, title, id } = post
    const selectedPost = { ...this.state.selectedPost, title, imageUrl, id }
    this.setState(state => ({ showModal: !state.showModal, selectedPost }))
  }

  addPostToCart = () => {
    this.props.rootStore.addPostToCart(this.state.selectedPost)
    // fetch("http://localhost:2403/parents/4cf263a813894806", {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Cookie:
    //       "sid=0bda592f6fbbde46122a5eefe15e650d07eebede5a7f6a33c3917804725c4e3d0871f4b2a812e1fb915db53a45ca6c9bb62388882c6ec665752c1f6530f64849"
    //   },
    //   body: JSON.stringify({
    //     ...this.state.selectedPost
    //   })
    // })
    //   .then(r => r.json())
    //   .then(r => console.log("RESPONSE", r))
  }

  renderModal = () => {
    const { quantity, imageUrl, title } = this.state.selectedPost
    return (
      <Modal animationType="slide" transparent>
        <Screen
          safeAreaStyle={{ backgroundColor: "#000000a1" }}
          style={{ flex: 1, backgroundColor: "#000000a1" }}
          contentContainerStyle={{ justifyContent: "center", flex: 1 }}
          footer={
            <Footer>
              <Button onPress={this.addPostToCart} text="Add post to cart" />
            </Footer>
          }
        >
          <Text
            style={{ fontSize: 40, color: "lightgray", position: "absolute", top: 20, right: 20 }}
            onPress={() => this.setState({ showModal: false })}
          >
            X
          </Text>
          <View
            style={{
              height: "30%",
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
            <Text style={{ marginTop: 5 }}>{title}</Text>
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
                  onChangeText={quantity => this.setState({ selectedPost: { quantity } })}
                />
              </View>
            </View>
          </View>
        </Screen>
      </Modal>
    )
  }

  render() {
    const { posts, showModal } = this.state
    return (
      <Screen fixed>
        {posts.length > 0 ? (
          <FlatList
            contentContainerStyle={{ paddingVertical: 20 }}
            data={posts}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            renderItem={({ item }) => (
              <Post
                title={item.title}
                imageUrl={item.imageUrl}
                actionText="Purchase"
                onPress={() => this.handleSelectPost(item)}
                style={{ borderWidth: 1, borderColor: "lightgray", padding: 20, borderRadius: 5 }}
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text>Loading...</Text>
        )}
        {showModal && this.renderModal()}
      </Screen>
    )
  }
}

export const FeedScreen = inject("rootStore")(observer(FeedScreen2))
