const axios = require("axios");

const getSettings = async (userId) => {
  const userSetting = axios.get(
    `https://мои-записи.рф/api/bot/setting/get/${userId}`
  );
  return userSetting;
};

module.exports = {
  getSettings,
};
