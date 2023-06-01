import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const Input = ({tempText}) => {
  const [text, onChangeText] = React.useState(tempText);

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "black",
    color: "#fff",
    fontSize: 16,
  },
});

export default Input;
