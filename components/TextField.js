import React from "react"
import { StyleSheet, TextInput, View } from "react-native"

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 16,
  },
  input: {
    padding: 10,
  }
})

export const TextField = ({ inputStyle, style, ...rest }) => (
  <View style={[styles.root, style]}>
    <TextInput style={[styles.input, inputStyle]} {...rest} />
  </View>
)