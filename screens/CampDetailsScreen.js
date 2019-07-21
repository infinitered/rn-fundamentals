import React from "react"
import { Image } from "react-native"
import { Button, Footer, Screen, Text } from "../components"

export class CampDetailsScreen extends React.Component {
  state = {
    camp: null
  }

  componentDidMount() {
    const { _id: campId } = this.props.navigation.getParam("camp")
    this.fetchCamp(campId)
  }

  async fetchCamp(campId) {
    const resp = await fetch(`http://localhost:3030/camp/${campId}`)
    const { data } = await resp.json()
    this.setState({
      camp: {
        _id: 1,
        name: "Camp Awesome",
        image: "https://facebook.github.io/react-native/docs/assets/favicon.png",
        description: "Blah blah blah",
      },
    })
  }

  goToRegister() {
    const { _id: campId } = this.props.navigation.getParam("camp")
    this.props.navigation.navigate("Register", { campId })
  }

  render() {
    const { camp } = this.state
    return (
      <Screen
        footer={
          <Footer>
            <Button
              onPress={() => this.goToRegister()}
              text="Register for this Camp"
            />
          </Footer>
        }>
        {camp &&
          <>
            <Image
              resizeMode="cover"
              style={{ height: 150, marginVertical: 20, width: "100%" }}
              source={{ uri: camp.image }}
            />
            <Text preset="title">{camp.name}</Text>
            <Text>{camp.description}</Text>
          </>
        }
      </Screen>
    )
  }
}