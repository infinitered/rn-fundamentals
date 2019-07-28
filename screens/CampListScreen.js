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
import { CAMPS } from "../fixtures"

export class CampListScreen extends React.Component {
  state = { camps: [] }

  componentDidMount() {
    this.fetchCamps()
  }

  fetchCamps = () => {
    this.setState({ camps: CAMPS })
  }
  render() {
    const { camps } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={camps}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => this.props.navigation.navigate("Camp", { campId: item.id })}
            >
              <View style={{ alignItems: "center", marginVertical: 10 }}>
                <Image
                  resizeMode="cover"
                  style={{ width: 150, height: 150 }}
                  source={{ uri: item.imageUrl }}
                />
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  button: {
    height: 50,
    width: 200,
    backgroundColor: "teal",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  }
})
