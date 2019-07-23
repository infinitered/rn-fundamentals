import React from "react"
import { Image, StyleSheet, View } from "react-native"
import { Button } from "./Button"
import { Text } from "./Text"

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

export const Post = ({ title, imageUrl, actionText, onPress, style }) => (
  <View style={style}>
    <Image resizeMode="cover" style={styles.image} source={{ uri: imageUrl }} />
    <View style={styles.content}>
      <Text text={title} />
      <Button text={actionText} onPress={onPress} />
    </View>
  </View>
)
