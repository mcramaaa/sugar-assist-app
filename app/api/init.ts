import * as SQLite from "expo-sqlite";
export const db = SQLite.openDatabase("sapi.db");
export function initDatabases() {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, breakfast VARCHAR(100) DEFAULT NULL, lunch VARCHAR(100) DEFAULT NULL, dinner VARCHAR(100) DEFAULT NULL);",
      [],
      () => console.log("Succes create Users Table"),
      (error) => {
        if (error) {
          console.error("Error creating table: ", error);
        }
        return false;
      }
    );
  });
}

export function emptyTable() {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM users",
      [],
      (_, result) => {
        console.log("Table emptied successfully");
      },
      (error) => {
        console.error("Error while emptying the table:", error);
        return false;
      }
    );
  });
}
