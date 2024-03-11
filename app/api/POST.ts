import { IUser } from "../hooks/zustand";
import { db } from "./init";

/**
 *
 * @param payload object
 * @returns promise
 */
export function createUser(payload: IUser) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO users (name, breakfast, lunch, dinner) values (?,?,?,?)`,
        [payload.name, payload.breakfast, payload.lunch, payload.dinner],
        (_, { insertId, rowsAffected }) => {
          resolve({ insertId, rowsAffected });
        },
        (error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}
