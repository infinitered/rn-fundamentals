import React from "react"
import { Button, Footer, Screen, TextField } from "../components"

export class SignUpScreen extends React.Component {
  state = {
    email: "",
    password: "",
    guardianName: "",
    childName: "",
  }

  handleSignUp() {
    this.props.navigation.navigate("Main")
  }

  render() {
    const { email, password, guardianName, childName } = this.state
    return (
      <Screen
        contentContainerStyle={{ justifyContent: "center" }}
        fixed
        footer={
          <Footer>
            <Button onPress={() => this.handleSignUp()} text="Sign Up" />
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
        <TextField
          value={guardianName}
          onChangeText={guardianName => this.setState({ guardianName })}
          placeholder="Guardian Name"
          autoCorrect={false}
        />
        <TextField
          value={childName}
          onChangeText={childName => this.setState({ childName })}
          placeholder="Child Name"
          autoCorrect={false}
        />
      </Screen>
    )
  }
}