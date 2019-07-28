import React from "react"
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Text
} from "react-native"
import { camps } from "./fixtures"

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={camps}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ flex: 1 }} onPress={() => alert(item.name)}>
            <View style={{ alignItems: "center", marginVertical: 10 }}>
              <Image
                resizeMode="cover"
                style={{ width: 150, height: 150 }}
                source={{ uri: item.imageUrl }}
              />
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
})
