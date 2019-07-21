import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "./Text"

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#3B8686",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
  },
  text: {
    color: "white",
  }
})

export const Button = ({ onPress, style, text, textStyle }) => (
  <TouchableOpacity
    style={[ styles.button, style ]}
    onPress={onPress}>
    <Text style={[ styles.text, textStyle ]}>
      {text}
    </Text>
  </TouchableOpacity>
)