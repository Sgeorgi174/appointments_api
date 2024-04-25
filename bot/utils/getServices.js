const axios = require("axios");

const getServices = async (userId) => {
  const services = axios.get(`http://localhost:8000/api/service/get/${userId}`);
  return services;
};

module.exports = {
  getServices,
};
