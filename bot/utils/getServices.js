const axios = require("axios");

const getServices = async (userId) => {
  const services = axios.get(`https://мои-записи.рф/api/service/get/${userId}`);
  return services;
};

module.exports = {
  getServices,
};
