import React from "react"
import { Image, SafeAreaView, Text, StyleSheet, View } from "react-native"
import { CAMPS } from "../fixtures"

const selectedCamp = campId => CAMPS.find(camp => camp.id === campId)

export class CampDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: selectedCamp(navigation.getParam("campId")).name
    }
  }

  state = {
    camp: null
  }

  componentDidMount() {
    const campId = this.props.navigation.getParam("campId")
    this.fetchCamp(campId)
  }

  fetchCamp = campId => {
    const camp = selectedCamp(campId)
    this.setState({ camp })
  }

  render() {
    const { camp } = this.state
    return (
      <SafeAreaView style={styles.container}>
        {camp && (
          <>
            <Image
              resizeMode="cover"
              style={{ margin: 20, flex: 0.5 }}
              source={{ uri: camp.imageUrl }}
            />
            <View style={{ flex: 0.5 }}>
              <Text style={styles.title}>{camp.name}</Text>
              <Text style={styles.description}>{camp.description}</Text>
            </View>
          </>
        )}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    marginHorizontal: 20,
    fontWeight: "bold",
    fontSize: 20
  },
  description: {
    marginTop: 10,
    marginHorizontal: 20,
    fontSize: 14
  }
})
