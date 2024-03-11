import { db } from "./init";

export function editUserSchedule(
  payload: { id: number; clock: string },
  name: string
) {
  return new Promise((resolve: any, reject: any) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE users SET ${name} = ? WHERE id = ?`,
        [payload.clock, payload.id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve({
              rowsAffected,
              clock: payload.clock,
            });
          } else {
            reject(new Error("User not found"));
          }
          // if (rowsAffected > 0) {
          //   notifications.cancelScheduledNotificationAsync(
          //     `${alarmData.tag}`
          //   );
          //   initNotification({
          //     title: `${payload.tag}`,
          //     body: `Alarm ${payload.tag}`,
          //     hour: Number(ltrimFirstZero(`${payload.hours}`)),
          //     minute: Number(ltrimFirstZero(`${payload.minute}`)),
          //     identifier: `${payload.tag}`,
          //   });
          //   resolve();
          // } else {
          //   reject(new Error("User not found"));
          // }
        },
        (_, error) => {
          console.log(error);
          reject(error);
          return false;
        }
      );
    });
  });
}
