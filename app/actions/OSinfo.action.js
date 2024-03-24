"use server";
const os = require("os");

export const getOSinfo = () => {
  const ostype = os.type();
  const osHostname = os.hostname();
  const userInfo = os.userInfo().username;
  const osInformations = {
    ostype,
    osHostname,
    userInfo,
  };
  return osInformations;
};
