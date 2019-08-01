import React from "react"
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator
} from "react-native"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    flex: 1
  },
  content: {
    alignItems: "stretch",
    paddingHorizontal: 16
  },
  loader: {
    backgroundColor: "#f2f2f2",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export const Screen = props => {
  const { children, fixed, footer, style, contentContainerStyle, safeAreaStyle, loading } = props
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3B8686" />
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, ...safeAreaStyle }}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView
          scrollEnabled={!fixed}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[fixed && { flex: 1 }, styles.content, contentContainerStyle]}
          style={[styles.container, style]}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
      {footer}
    </SafeAreaView>
  )
}
