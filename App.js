import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import Button from "./components/Button";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  const clicked = () => alert("You FUCKEWED YOUESELF a button.");
  return (
    <View style={styles.container}>
      <Button label="Start A New Game" onPressFunction={clicked}></Button>
      <Image source={trophyIcon} style={styles.image}></Image>
      <Button label="Resume Game" onPressFunction={clicked}></Button>
      <StatusBar style="auto" />
    </View>
  );
};

const NewGameScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button label="Start A New Game"></Button>
      <Image source={trophyIcon} style={styles.image}></Image>
      <Button label="Resume Game"></Button>
      <StatusBar style="auto" />
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
