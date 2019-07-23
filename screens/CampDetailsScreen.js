import React from "react"
import { Image } from "react-native"
import { Button, Footer, Screen, Text } from "../components"

export class CampDetailsScreen extends React.Component {
  state = {
    camp: null
  }

  componentDidMount() {
    const { id: campId } = this.props.navigation.getParam("camp")
    this.fetchCamp(campId)
  }

  async fetchCamp(campId) {
    const resp = await fetch(`http://localhost:2403/camps/${campId}`)
    const camp = await resp.json()
    const { id, name, imageUrl } = camp
    this.setState({
      camp: {
        id,
        name,
        imageUrl,
        description: "Blah blah blah"
      }
    })
  }

  goToRegister() {
    const { id: campId } = this.props.navigation.getParam("camp")
    this.props.navigation.navigate("Register", { campId })
  }

  render() {
    const { camp } = this.state
    return (
      <Screen
        footer={
          <Footer>
            <Button onPress={() => this.goToRegister()} text="Register for this Camp" />
          </Footer>
        }
      >
        {camp && (
          <>
            <Image
              resizeMode="cover"
              style={{ height: 150, marginVertical: 20, width: "100%" }}
              source={{ uri: camp.imageUrl }}
            />
            <Text preset="title">{camp.name}</Text>
            <Text>{camp.description}</Text>
          </>
        )}
      </Screen>
    )
  }
}
