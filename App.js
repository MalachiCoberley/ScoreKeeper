import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Button from "./components/Button";
import { database } from "./components/database";

const Stack = createNativeStackNavigator();
const trophyIcon = require("./assets/trophy.png");

const App = () => {
  const [players, setPlayers] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(false);

  //Create App Database
  React.useEffect(() => {
    database.setupDatabase();
  });

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
          component={SelectTeamScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreateTeam"
          component={NewTeamScreen}
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
    return;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={currentGameName}
        onChangeText={setGameName}
      ></TextInput>
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

const SelectTeamScreen = ({ navigation }) => {
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
    selected: false,
  },
  {
    id: 1223,
    title: "Jess",
    selected: false,
  },
  {
    id: 3123,
    title: "Caleb",
    selected: false,
  },
  {
    id: 1423,
    title: "Sandy",
    selected: false,
  },
];
const Item = ({ title }) => (
  <View style={styles.item}>
    <Button label={title} onPress={() => alert(`Pressed ${title}`)} />
  </View>
);

const NewTeamScreen = ({ navigation }) => {
  const [currentTeamName, setTeamName] = React.useState("New Team Name");
  const [allPlayers, setAllPlayers] = React.useState([]);
  const [addNewPlayer, setAddNewPlayer] = React.useState(false);
  const [newPlayerName, setNewPlayerName] = React.useState("Name");

  React.useEffect(() => {
    database.getAllPlayers(setAllPlayers);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={currentTeamName}
        onChangeText={setTeamName}
      ></TextInput>
      <FlatList
        data={allPlayers}
        renderItem={({ item }) => <Item title={item.name} />}
        keyExtractor={(item) => item.id}
      />
      {addNewPlayer ? (
        <View>
          <TextInput
            style={styles.input}
            value={newPlayerName}
            onChangeText={setNewPlayerName}
          />
          <Button
            label="Create Player"
            onPress={() => {
              database.addNewPlayer(newPlayerName);
              /*
              Rather than using a callback that returns the ID for a new player, I just fudge the ID
              by adding 1 to the last ID in my list. obviously prone to breaking but i think we're ok.
              */
              let newId = allPlayers[allPlayers.length - 1].id + 1;
              let newPlayerObject = {
                id: newId,
                name: newPlayerName,
              };
              setAddNewPlayer(false);
              setNewPlayerName("Name");
              setAllPlayers([...allPlayers, newPlayerObject]);
            }}
          />
        </View>
      ) : (
        <Button label="+ Player" onPress={() => setAddNewPlayer(true)} />
      )}
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
