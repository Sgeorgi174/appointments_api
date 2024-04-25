const axios = require("axios");

const getSettings = async (userId) => {
  const userSetting = axios.get(
    `http://localhost:8000/api/bot/setting/get/${userId}`
  );
  return userSetting;
};

module.exports = {
  getSettings,
};
