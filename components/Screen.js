import React from "react"
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    flex: 1
  },
  content: {
    alignItems: "stretch",
    paddingHorizontal: 16
  }
})

export const Screen = props => {
  console
  const { children, fixed, footer, style, contentContainerStyle, safeAreaStyle } = props
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
