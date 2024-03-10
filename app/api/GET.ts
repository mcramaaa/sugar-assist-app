import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("sapi.db");

export function getUsers() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users",
        [],
        (_, { rows }) => {
          const userRows = rows._array;
          resolve(userRows);
        },
        (error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}
