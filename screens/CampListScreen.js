import React from "react"
import { FlatList, TouchableOpacity } from "react-native"
import { Button, Footer, Screen, Tile } from "../components"
import { observer, inject } from "mobx-react"

class CampList extends React.Component {
  state = {
    camps: []
  }

  componentDidMount() {
    this.fetchCamps()
  }

  async fetchCamps() {
    const sid = ""
    const resp = await fetch("http://localhost:2403/camps", {
      ...(sid && { Cookie: `sid=${sid}` })
    })
    const camps = await resp.json()
    this.setState({ camps })
  }

  goToDetails(camp) {
    this.props.navigation.navigate("Camp", { camp })
  }

  goToLogin() {
    this.props.navigation.navigate("SignIn")
  }

  render() {
    const { camps } = this.state
    return (
      <Screen
        fixed
        loading={!camps.length > 0}
        footer={
          <Footer>
            <Button onPress={() => this.goToLogin()} text="Sign In" />
          </Footer>
        }
      >
        <FlatList
          data={camps}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ flex: 0.5 }} onPress={() => this.goToDetails(item)}>
              <Tile title={item.name} imageUri={item.imageUrl} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </Screen>
    )
  }
}

export const CampListScreen = inject("rootStore")(observer(CampList))
