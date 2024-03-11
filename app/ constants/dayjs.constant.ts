import moment from "moment";

export const appDayjs = {
  days: moment().format("dddd"),
  date: moment().format("DD MMMM"),
  year: moment().format("YYYY"),
};
