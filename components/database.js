import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("scores.db");
console.log("DB STARTED");

const setupDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS players (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, team1 INTEGER NOT NULL, t1score INTEGER DEFAULT 0, team2 INTEGER NOT NULL, t2score INTEGER DEFAULT 0, winner INTEGER)"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS teams (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, wins INTEGER DEFAULT 0, losses INTEGER DEFAULT 0)"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS rosters (id INTEGER PRIMARY KEY AUTOINCREMENT, teamId INTEGER NOT NULL, playerID INTEGER NOT NULL)"
    );
  });
};

const addNewPlayer = async (name) => {
  db.transaction((tx) => {
    tx.executeSql("INSERT INTO players (name) values (?)", [name]);
  });
};

const getAllPlayers = (setStateFunction) => {
  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM players", null, (_, { rows: { _array } }) => {
      setStateFunction(_array);
    });
  });
};

const getAllTeams = (setStateFunction) => {
  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM teams", null, (_, { rows: { _array } }) => {
      setStateFunction(_array);
    });
  });
};

const createTeam = (teamName, players) => {
  if (players.length < 1 || teamName == "") {
    console.log("Invalid Team");
  } else {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO teams (name) values (?)",
        [teamName],
        (tx, res) => {
          for (const player of players) {
            tx.executeSql(
              "INSERT INTO rosters (teamId, playerId) values (?, ?)",
              [res.insertId, player]
            );
          }
        }
      );
    });
  }
};

const getTeamRoster = (teamId, setStateFunction) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM rosters where teamId = ?",
      [teamId],
      (_, { rows: { _array } }) => {
        setStateFunction(_array);
      }
    );
  });
};

export const database = {
  setupDatabase,
  addNewPlayer,
  getAllPlayers,
  createTeam,
  getAllTeams,
  getTeamRoster
};
