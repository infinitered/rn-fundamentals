import React from "react"
import { SafeAreaView, StyleSheet, Text } from "react-native"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"

export class LoginScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Login"
  }

  state = {
    username: "",
    password: ""
  }

  setInput = (type, value) => {
    this.setState({ [type]: value })
  }

  handleLogin = () => {
    const { username, password } = this.state
    const hasValidation = username.length > 0 && password.length > 0
    if (hasValidation) {
      this.props.navigation.navigate("Home")
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
