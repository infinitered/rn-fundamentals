import React from "react"
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Text
} from "react-native"

export class FeedScreen extends React.Component {
  state = { posts: [] }

  componentDidMount() {
    this.fetchPosts()
  }

  fetchPosts = async () => {
    const resp = await fetch("https://campminder-training-api.herokuapp.com/posts")
    const posts = await resp.json()
    this.setState({ posts })
  }
  render() {
    const { posts } = this.state
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
                onPress={() => alert(`Open modal to ${item.title}`)}
              >
                <Text style={styles.buttonText}>Purchase</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
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
