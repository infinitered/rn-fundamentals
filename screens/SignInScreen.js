import React from "react"
import { TouchableOpacity } from "react-native"
import { Button, Footer, Screen, TextField } from "../components"
import { Ionicons } from "@expo/vector-icons"

export class SignInScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack(null)} style={{ paddingHorizontal: 16 }}>
        <Ionicons name="ios-close" size={40} color="white" />
      </TouchableOpacity>
    )
  })

  state = {
    email: "fvonhoven@gmail.com",
    password: "12345678"
  }

  handleSignIn() {
    const { email, password } = this.state
    fetch("http://localhost:2403/parents/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: email,
        password
      })
    })
      .then(r => r.json())
      .then(response => {
        if (response.message) {
          alert(response.message)
        } else {
          console.log(response)
          this.props.navigation.navigate("Main")
        }
      })
  }

  render() {
    const { email, password } = this.state
    return (
      <Screen
        contentContainerStyle={{ justifyContent: "center" }}
        fixed
        footer={
          <Footer>
            <Button onPress={this.handleSignIn} text="Sign In" />
          </Footer>
        }
      >
        <TextField
          value={email}
          onChangeText={email => this.setState({ email })}
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
        />
        <TextField
          value={password}
          onChangeText={password => this.setState({ password })}
          placeholder="Password"
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={() => this.handleSignIn()}
        />
      </Screen>
    )
  }
}
