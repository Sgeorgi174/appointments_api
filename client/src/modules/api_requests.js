import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const getToken = () => {
  return localStorage.getItem("token");
};

const sendRequest = async ({ method, url, data }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

// AUTH
export const login = async (loginData) => {
  return sendRequest({
    method: "POST",
    url: `${BASE_URL}/user/login`,
    data: loginData,
  });
};

export const register = async (registerData) => {
  return sendRequest({
    method: "POST",
    url: `${BASE_URL}/user/register`,
    data: registerData,
  });
};

//SCHEDULE
export const getSchedule = async () => {
  return sendRequest({ method: "GET", url: `${BASE_URL}/timetable/get` });
};

export const getCurrentSchedule = async (id) => {
  return sendRequest({ method: "GET", url: `${BASE_URL}/timetable/get/${id}` });
};

export const createSchedule = async (createData) => {
  return sendRequest({
    method: "POST",
    url: `${BASE_URL}/timetable/generate`,
    data: createData,
  });
};

export const changeAvailabilityDay = async (date) => {
  return sendRequest({
    method: "PUT",
    url: `${BASE_URL}/timetable/changeDay`,
    data: date,
  });
};

export const changeAvailabilityHour = async (hourId) => {
  return sendRequest({
    method: "PUT",
    url: `${BASE_URL}/timetable/changeHour`,
    data: hourId,
  });
};

//SERVICES
export const getServices = async () => {
  return sendRequest({ method: "GET", url: `${BASE_URL}/service/get` });
};

export const getCurrentServices = async (id) => {
  return sendRequest({ method: "GET", url: `${BASE_URL}/service/get/${id}` });
};

export const deleteService = async (deletedData) => {
  return sendRequest({
    method: "PUT",
    url: `${BASE_URL}/service/delete`,
    data: deletedData,
  });
};

export const editService = async (updateData) => {
  return sendRequest({
    method: "PUT",
    url: `${BASE_URL}/service/edit`,
    data: updateData,
  });
};

export const addService = async (addData) => {
  return sendRequest({
    method: "POST",
    url: `${BASE_URL}/service/add`,
    data: addData,
  });
};

//BOT SETTINGS
export const createSettings = async (settingsData) => {
  return sendRequest({
    method: "POST",
    url: `${BASE_URL}/bot/setting/add`,
    data: settingsData,
  });
};

export const getSettings = async () => {
  return sendRequest({
    method: "GET",
    url: `${BASE_URL}/bot/setting/get`,
  });
};

export const editSettings = async (settingsData) => {
  return sendRequest({
    method: "PUT",
    url: `${BASE_URL}/bot/setting/edit`,
    data: settingsData,
  });
};
