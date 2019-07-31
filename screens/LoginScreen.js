import React from "react"
import { SafeAreaView, StyleSheet, Text } from "react-native"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"
import { observer, inject } from "mobx-react"

class Login extends React.Component {
  static navigationOptions = {
    headerTitle: "Login"
  }

  state = {
    username: "fvonhoven@gmail.com",
    password: "12345678"
  }

  setInput = (type, value) => {
    this.setState({ [type]: value })
  }

  handleLogin = () => {
    const { username, password } = this.state
    const hasValidation = username.length > 0 && password.length > 0
    if (hasValidation) {
      fetch("https://campminder-training-api.herokuapp.com/parents/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      }).then(response => {
        if (response.ok) {
          this.props.navigation.navigate("Home")
        } else {
          alert("Problem logging in")
        }
      })
    } else {
      alert("Complete all fields")
    }
  }

  render() {
    const { username, password } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          value={username}
          style={styles.input}
          autoCapitalize="none"
          autoFocus
          placeholder="username"
          onChangeText={value => this.setInput("username", value)}
        />
        <TextInput
          value={password}
          secureTextEntry
          style={styles.input}
          placeholder="password"
          onChangeText={value => this.setInput("password", value)}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    height: 50,
    width: 200,
    borderWidth: 1,
    borderColor: "lightgray",
    margin: 10,
    padding: 5
  },
  button: {
    height: 50,
    width: 200,
    backgroundColor: "teal",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  }
})

export const LoginScreen = inject("rootStore")(observer(Login))
