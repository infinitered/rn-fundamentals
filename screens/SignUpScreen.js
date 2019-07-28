import React from "react"
import { AsyncStorage } from "react-native"
import { Button, Footer, Screen, TextField } from "../components"
import { observer, inject } from "mobx-react"

export class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    parentName: "",
    childName: ""
  }

  handleSignUp() {
    const { navigation, rootStore } = this.props
    const { setUserId } = rootStore
    const { email, password, parentName, childName } = this.state
    const campId = navigation.getParam("campId")
    fetch("https://campminder-training-api.herokuapp.com/parents", {
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
      })
    })
      .then(r => r.json())
      .then(response => {
        if (response.message) {
          alert(response.message)
        } else {
          setUserId(response.id)
          AsyncStorage.setItem("userId", response.id)
          navigation.navigate("Main")
        }
      })
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

export const SignUpScreen = inject("rootStore")(observer(SignUp))
