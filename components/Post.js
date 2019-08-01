import React from "react"
import { Image, StyleSheet, View, Text } from "react-native"
import { Button } from "./Button"

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: "100%"
  },
  content: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10
  }
})

export const Post = ({ title, imageUrl, actionText, onPress, style, quantity, total }) => (
  <View style={style}>
    <Image resizeMode="cover" style={styles.image} source={{ uri: imageUrl }} />
    <View style={styles.content}>
      <Text>{title}</Text>
      {actionText && <Button text={actionText} onPress={onPress} />}
      {quantity && <Text style={{ fontSize: 16, fontWeight: "bold" }}>Quantity: {quantity}</Text>}
    </View>
  </View>
)
