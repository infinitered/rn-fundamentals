import React from "react"
import { FlatList } from "react-native"
import { Post, Screen, Text } from "../components"

export class FeedScreen extends React.Component {
  state = {
    posts: []
  }

  componentDidMount() {
    this.fetchPosts()
  }

  async fetchPosts() {
    // const resp = await fetch(`http://localhost:3030/camp/${campId}`)
    // const { data: { posts } } = await resp.json()
    this.setState({
      posts: [
        { _id: 1, title: "Post 1", image: "https://facebook.github.io/react-native/docs/assets/favicon.png" },
        { _id: 2, title: "Post 2", image: "https://facebook.github.io/react-native/docs/assets/favicon.png" },
        { _id: 3, title: "Post 3", image: "https://facebook.github.io/react-native/docs/assets/favicon.png" },
        { _id: 4, title: "Post 4", image: "https://facebook.github.io/react-native/docs/assets/favicon.png" },
      ]
    })
  }

  render() {
    const { posts } = this.state
    return (
      <Screen fixed>
        {posts.length > 0
          ? <FlatList
              data={posts}
              renderItem={({ item }) => (
                <Post title={item.title} imageUri={item.image} actionText="Purchase" onPress={() => alert("do purchase")} />
              )}
              keyExtractor={item => String(item._id)}
              showsVerticalScrollIndicator={false}
            />
          : <Text>Loading...</Text>
        }
      </Screen>
    )
  }
}