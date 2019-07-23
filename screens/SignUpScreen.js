import React from "react"
import { Button, Footer, Screen, TextField } from "../components"

export class SignUpScreen extends React.Component {
  state = {
    email: "",
    password: "",
    parentName: "",
    childName: ""
  }

  handleSignUp() {
    const { navigation } = this.props
    const { email, password, parentName, childName } = this.state
    const campId = navigation.getParam("campId")
    fetch("http://localhost:2403/parents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: email,
        password,
        name: parentName,
        childName,
        registeredCamp: campId
        // userId: "345"
      })
    })
    navigation.navigate("Main")
  }

  render() {
    const { email, password, parentName, childName } = this.state
    return (
      <Screen
        contentContainerStyle={{ justifyContent: "center" }}
        fixed
        footer={
          <Footer>
            <Button onPress={() => this.handleSignUp()} text="Sign Up" />
          </Footer>
        }
      >
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
        />
        <TextField
          value={parentName}
          onChangeText={parentName => this.setState({ parentName })}
          placeholder="Your Name"
          autoCorrect={false}
        />
        <TextField
          value={childName}
          onChangeText={childName => this.setState({ childName })}
          placeholder="Child Name"
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={() => this.handleSignUp()}
        />
      </Screen>
    )
  }
}
