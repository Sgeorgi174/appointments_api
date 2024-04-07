const BASE_URL = "http://мои-записи.рф/api";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

const fetchData = async ({ url, method, data, token }) => {
  try {
    let response;
    if (data) {
      response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // добавляем токен в заголовок Authorization
        },
        body: JSON.stringify(data),
      });
    } else {
      response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // добавляем токен в заголовок Authorization
        },
      });
    }

    console.log(response.headers);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

//USERS
export const login = async (loginData) => {
  const url = `${BASE_URL}/user/login`;
  return fetchData({ url, method: "POST", data: loginData });
};

export const register = async (registerData) => {
  const url = `${BASE_URL}/user/register`;
  return fetchData({ url, method: "POST", data: registerData });
};

//SCHEDULE
export const getSchedule = async () => {
  const url = `${BASE_URL}/timetable/get`;
  const token = getToken(); // Получаем токен только в момент вызова запроса
  return fetchData({ url, method: "GET", token });
};

export const createSchedule = async (createData) => {
  const url = `${BASE_URL}/timetable/generate`;
  const token = getToken(); // Получаем токен только в момент вызова запроса
  return fetchData({ url, method: "POST", data: createData, token });
};

//SERVICE
export const getServices = async () => {
  const url = `${BASE_URL}/service/get`;
  const token = getToken(); // Получаем токен только в момент вызова запроса
  return fetchData({ url, method: "GET", token });
};

export const deleteService = async (deletedData) => {
  const url = `${BASE_URL}/service/delete`;
  const token = getToken(); // Получаем токен только в момент вызова запроса
  return fetchData({ url, method: "PUT", data: deletedData, token });
};

export const editService = async (updateData) => {
  const url = `${BASE_URL}/service/edit`;
  const token = getToken();
  return fetchData({ url, method: "PUT", data: updateData, token });
};
