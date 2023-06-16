import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import * as Font from "expo-font"
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Button from "./components/Button";
import { database } from "./components/database";
import useFonts from "./hooks/useFonts";

const Stack = createNativeStackNavigator();
const trophyIcon = require("./assets/trophy.png");
const OsContext = React.createContext();
const windowDimensions = Dimensions.get("window");


const IphoneBackButton = ({ navigation }) => {
  return (
    <View style={styles.back}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{"<"}</Text>
      </Pressable>
    </View>
  );
};

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(false);
  const [os, setOs] = React.useState(Platform.OS);

  const LoadFonts = async () => {
    await useFonts();
  };

  //Create App Database
  React.useEffect(() => {
    database.setupDatabase();
    Font.loadAsync({
      vs: require("./assets/fonts/ChrustyRock-ORLA.ttf"),
    })
  });

  return (
    <OsContext.Provider value={os}>
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
    </OsContext.Provider>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.centerContainer}>
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
  const isIphone = React.useContext(OsContext) !== "ios";
  const [currentGameName, setGameName] = React.useState("Enter Game Name");
  const [teamOne, setTeamOne] = React.useState("Select A Team");
  const [teamTwo, setTeamTwo] = React.useState("Select A Team");
  const saveAndStart = () => {
    //TODO: onClick for Start Game button - Create Game with Teams and name
    //Should probs remove itself from Nav stack so you will have to choose resume
    return;
  };

  return (
    <View style={styles.container}>
      {isIphone ? <IphoneBackButton navigation={navigation} /> : null}
      <TextInput
        style={styles.input}
        value={currentGameName}
        onChangeText={setGameName}
      ></TextInput>
      <Button
        label={teamOne}
        onPress={() =>
          navigation.navigate("SelectTeam", { setTeamFunction: setTeamOne })
        }
      />
      <Text style={styles.vsText}>VS</Text>
      <Button
        label={teamTwo}
        onPress={() =>
          navigation.navigate("SelectTeam", { setTeamFunction: setTeamTwo })
        }
      />
      <Button
        label="Start Game"
        onPress={() => {
          console.log(teamOne, teamTwo);
          navigation.navigate("Score");
        }}
      />
    </View>
  );
};

const SelectTeamScreen = ({ route, navigation }) => {
  const isIphone = React.useContext(OsContext) == "ios";
  const setTeamFunction = route.params.setTeamFunction;
  const [allTeams, setAllTeams] = React.useState([]);

  React.useEffect(() => {
    database.getAllTeams(setAllTeams);
  }, []);

  const Item = ({ title, id }) => {
    return (
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            setTeamFunction(title);
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonLabel}>{title}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isIphone ? <IphoneBackButton navigation={navigation} /> : null}
      <FlatList
        data={allTeams}
        renderItem={({ item }) => <Item title={item.name} id={item.id} />}
        keyExtractor={(item) => item.id}
      />
      <Button
        label="New Team"
        onPress={() => navigation.navigate("CreateTeam")}
      />
    </View>
  );
};

const NewTeamScreen = ({ navigation }) => {
  const isIphone = React.useContext(OsContext) == "ios";
  const [currentTeamName, setTeamName] = React.useState("New Team Name");
  const [allPlayers, setAllPlayers] = React.useState([]);
  const [addNewPlayer, setAddNewPlayer] = React.useState(false);
  const [newPlayerName, setNewPlayerName] = React.useState("Name");
  const [selectedPlayers, setSelectedPlayers] = React.useState([]);

  const Item = ({ title, id }) => {
    return (
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            if (!selectedPlayers.includes(id)) {
              setSelectedPlayers([...selectedPlayers, id]);
            }
          }}
        >
          <Text style={styles.buttonLabel}>{title}</Text>
        </Pressable>
      </View>
    );
  };

  React.useEffect(() => {
    database.getAllPlayers(setAllPlayers);
  }, []);

  return (
    <View style={styles.container}>
      {isIphone ? <IphoneBackButton navigation={navigation} /> : null}
      <TextInput
        style={styles.input}
        value={currentTeamName}
        onChangeText={setTeamName}
      ></TextInput>
      <FlatList
        data={allPlayers}
        renderItem={({ item }) => <Item title={item.name} id={item.id} />}
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
              by adding 1 to the last ID in my list.
              This can fuck team creation if it's not accurate. Note to self if the WRONG PLAYER IS ASSIGNED TO A TEAM.
              */
              let newId =
                allPlayers.length > 0
                  ? allPlayers[allPlayers.length - 1].id + 1
                  : 1;
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
      <Button
        label="Confirm Team"
        onPress={() => {
          console.log(selectedPlayers);
          database.createTeam(currentTeamName, selectedPlayers);
          navigation.goBack();
        }}
      />
    </View>
  );
};

const IncompleteGamesScreen = ({ navigation }) => {
  const isIphone = React.useContext(OsContext) == "ios";
  return (
    <View style={styles.container}>
      {isIphone ? <IphoneBackButton navigation={navigation} /> : null}
      <Text>Placeholder for a List of incomplete games</Text>
      <Button
        label="Start A New Game"
        onPress={() => navigation.navigate("NewGame")}
      />
    </View>
  );
};

const ScoreScreen = ({ navigation }) => {
  const isIphone = React.useContext(OsContext) == "ios";
  return (
    <View style={styles.container}>
      {isIphone ? <IphoneBackButton navigation={navigation} /> : null}
      <Text>Team Placeholder</Text>
      <Button label="-" onPress={() => alert("T1 decreased")} />
      <Text>Team 1 Score Placeholder</Text>
      <Button label="+" onPress={() => alert("T1 Increased")} />
      <Button label="Declare Winner" onPress={() => alert("Really?!?!?!")} />
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 40,
    marginTop: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
    paddingBottom: 40,
    marginTop: 5,
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
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    padding: 3,
    borderRadius: 10,
  },
  button: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    zIndex: 0,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
  back: {
    marginTop: 0,
    alignSelf: "flex-start",
    marginLeft: 15,
  },
  backText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  vsText: {
    fontSize: 80,
    fontFamily: "vs",
  },
});

export default App;
