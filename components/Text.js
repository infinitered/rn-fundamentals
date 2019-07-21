import React from "react"
import { StyleSheet, Text as RNText } from "react-native"

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  base: {
    fontSize: 16,
    color: "#808080",
  }
})

export const Text = ({ preset = "base", style, text, children, ...rest }) => (
  <RNText style={[styles.base, styles[preset], style]} {...rest}>
    {text || children}
  </RNText>
)