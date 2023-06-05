import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SQLite from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { FlatList, Image, StyleSheet, Text, View, TextInput } from "react-native";
import Button from "./components/Button";

const Stack = createNativeStackNavigator();
const trophyIcon = require("./assets/trophy.png");

const App = () => {
  const db = SQLite.openDatabase("scores.db");
  // const [isLoading, setIsLoading] = React.useState(false);
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
          name="IncompleteGames"
          component={IncompleteGamesScreen}
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
        <Stack.Screen
          name="SelectTeam"
          component={NewTeamScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreateTeam"
          component={TeamCreationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Score"
          component={ScoreScreen}
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
        onPress={() => navigation.navigate("IncompleteGames")}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const NewGameScreen = ({ navigation }) => {
  const [currentGameName, setGameName] = React.useState("Enter Game Name");
  const saveAndStart = () => {
    //TODO: onClick for Start Game button - Create Game with Teams and name
    //Should probs remove itself from Nav stack so you will have to choose resume 
    return
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={currentGameName} onChangeText={setGameName}></TextInput>
      <Button
        label="Select Team 1"
        onPress={() => navigation.navigate("SelectTeam")}
      />
      <Text>VS</Text>
      <Button
        label="Select Team 2"
        onPress={() => navigation.navigate("SelectTeam")}
      />
      <Button label="Start Game" onPress={() => navigation.navigate("Score")} />
    </View>
  );
};

const NewTeamScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Placeholder for a List of teams</Text>
      <Button
        label="New Team"
        onPress={() => navigation.navigate("CreateTeam")}
      />
    </View>
  );
};

let data = [
  {
    id: 123,
    title: "Malachi",
  },
  {
    id: 1223,
    title: "Jess",
  },
  {
    id: 3123,
    title: "Caleb",
  },
  {
    id: 1423,
    title: "Sandy",
  },
];
const Item = ({ title }) => (
  <View style={styles.item}>
    <Button label={title} onPress={() => alert(`Pressed ${title}`)} />
  </View>
);

const TeamCreationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} tempText={"Enter Team Name"}></TextInput>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
      />
      <Button label="+ Player" onPress={() => alert("Pressed")} />
      <Button label="Confirm Team" onPress={() => alert("Pressed")} />
    </View>
  );
};

const IncompleteGamesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Placeholder for a List of incomplete games</Text>
      <Button
        label="Start A New Game"
        onPress={() => navigation.navigate("NewGame")}
      />
    </View>
  );
};

const ScoreScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Team Placeholder</Text>
      <Button label="-" onPress={() => alert("T1 decreased")} />
      <Text>Team 1 Score Placeholder</Text>
      <Button label="+" onPress={() => alert("T1 Increased")} />
      <Button label="Declare Winner" onPress={() => alert("Really?!?!?!")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
  image: {
    width: 320,
    height: 320,
    marginTop: 40,
    marginBottom: 40,
  },
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

export default App;
