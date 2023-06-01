import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "./components/Button";
import Input from "./components/Input";

const Stack = createNativeStackNavigator();
const trophyIcon = require("./assets/trophy.png");

const App = () => {
  // const db = SQLite.openDatabase("scores.db");
  // const [isLoading, setIsLoading] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NewGame"
          component={NewGameScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        label="Start A New Game"
        onPress={() => navigation.navigate("NewGame")}
      />
      <Image source={trophyIcon} style={styles.image}></Image>
      <Button
        label="Resume Game"
        onPress={() => alert("You FUCKEWED YOUESELF a button.")}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const NewGameScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Input></Input>
      <Button
        label="Select Team 1"
        onPress={() => alert("You FUCKEWED YOUESELF a button.")}
      />
      <Text>VS</Text>
      <Button
        label="Select Team 2"
        onPress={() => alert("You FUCKEWED YOUESELF a button.")}
      />
      <Button
        label="Start Game"
        onPress={() => alert("You FUCKEWED YOUESELF a button.")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 320,
    height: 320,
    marginTop: 40,
    marginBottom: 40,
  },
});

export default App;
