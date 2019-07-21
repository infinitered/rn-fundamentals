import React from "react"
import { TouchableOpacity } from "react-native"
import { Button, Footer, Screen, TextField } from "../components"
import { Ionicons } from '@expo/vector-icons'

export class SignInScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.goBack(null)}
        style={{paddingHorizontal: 16}}>
        <Ionicons name="ios-close" size={40} color="white" />
      </TouchableOpacity>
    )
  })

  state = {
    email: "",
    password: "",
  }

  handleSignIn() {
    alert("actually sign in")
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
        }>
        <TextField
          value={email}
          onChangeText={email => this.setState({ email })}
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
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