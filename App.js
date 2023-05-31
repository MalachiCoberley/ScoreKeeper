import * as SQLite from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./components/Button";

export default function App() {
  const db = SQLite.openDatabase("scores.db");
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text> Loading... </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button label="Start A New Game"></Button>
      <Text>Score Keeping Baaaaby</Text>
      <Button label="Resume Game"></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
});
