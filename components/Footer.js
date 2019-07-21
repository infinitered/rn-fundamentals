import React from "react"
import { StyleSheet, View } from "react-native"

const styles = StyleSheet.create({
  footer: {
    minHeight: 44,
    padding: 16,
  }
})


export const Footer = ({ children, style }) => (
  <View style={[ styles.footer, style ]}>
    {children}
  </View>
)