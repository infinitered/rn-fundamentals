import React from "react"
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  Modal,
  TextInput
} from "react-native"
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

  fetchPosts = async () => {
    const resp = await fetch("https://campminder-training-api.herokuapp.com/posts")
    const posts = await resp.json()
    this.setState({ posts })
  }

  addPostToCart = () => {
    this.props.rootStore.addPostToCart(this.state.selectedPost)
    this.setState({ showModal: false, selectedPost: DEFAULT_SELECTED_POST })
  }

  render() {
    const { posts, selectedPost, showModal } = this.state
    const { quantity, imageUrl, title, price } = selectedPost
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.cell}>
              <View>
                <Image
                  resizeMode="cover"
                  style={{ width: "100%", height: 150 }}
                  source={{ uri: item.imageUrl }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginVertical: 10
                  }}
                >
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>${item.price}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  this.setState(state => ({
                    showModal: !state.showModal,
                    selectedPost: { ...state.selectedPost, ...item }
                  }))
                }
              >
                <Text style={styles.buttonText}>Purchase</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />

        <Modal animationType="slide" transparent visible={showModal}>
          <View style={{ flex: 1, backgroundColor: "#000000a1", justifyContent: "center" }}>
            <Text
              style={{ fontSize: 40, color: "lightgray", position: "absolute", top: 20, right: 20 }}
              onPress={() => this.setState({ showModal: false })}
            >
              X
            </Text>
            <View
              style={{
                height: "50%",
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
                      this.setState(state => ({
                        selectedPost: { ...state.selectedPost, quantity }
                      }))
                    }
                  />
                </View>
              </View>
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 200,
                  backgroundColor: "teal",
                  alignSelf: "center",
                  justifyContent: "center",
                  margin: 20
                }}
                onPress={this.addPostToCart}
                text="Add post to cart"
              >
                <Text style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  cell: {
    margin: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    padding: 10
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  },
  price: {
    fontSize: 16
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: "teal",
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  }
})

export const FeedScreen = inject("rootStore")(observer(Feed))
