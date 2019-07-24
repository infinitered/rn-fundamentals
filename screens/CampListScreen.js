import React from "react"
import { FlatList, TouchableOpacity, AsyncStorage } from "react-native"
import { Button, Footer, Screen, Tile } from "../components"
import { observer, inject } from "mobx-react"

class CampList extends React.Component {
  state = {
    camps: []
  }

  componentDidMount() {
    AsyncStorage.multiGet(["token", "userId"], (err, result) => {
      if (err) this.fetchCamps()
      const token = result[0][1]
      const userId = result[1][1]
      if (token) {
        const { setToken, setUserId } = this.props.rootStore
        setToken(token)
        setUserId(userId)
        this.props.navigation.navigate("Main")
      } else {
        this.fetchCamps()
      }
    })
  }

  async fetchCamps() {
    const resp = await fetch("http://localhost:2403/camps")
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
