import React from "react"
import { Image, View } from "react-native"
import { Text } from "./Text"

export const Tile = ({ children, title, imageUri, style }) => (
  <View style={{ alignItems: "center", marginVertical: 10, ...style }}>
    <Image
      resizeMode="cover"
      style={{ width: 150, height: 150 }}
      source={{ uri: imageUri }}
    />
    <Text text={title} />
  </View>
)