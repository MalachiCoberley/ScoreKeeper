import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("scores.db");

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

const addNewPlayer = (name) => {
  db.transaction((tx) => {
    tx.executeSql("INSERT INTO players (name) values (?)", [name]);
  });
};

export const database = {
  setupDatabase,
  addNewPlayer,
};
