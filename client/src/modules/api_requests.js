const BASE_URL = "http://localhost:8000/api";

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

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    if (data) {
      localStorage.setItem("token", responseData.token);
    }

    return responseData;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
};

export const login = async (loginData) => {
  const url = `${BASE_URL}/user/login`;
  return fetchData({ url, method: "POST", data: loginData });
};

export const register = async (registerData) => {
  const url = `${BASE_URL}/user/register`;
  return fetchData({ url, method: "POST", data: registerData });
};

export const getSchedule = async () => {
  const url = `${BASE_URL}/timetable/get`;
  const token = getToken(); // Получаем токен только в момент вызова запроса
  return fetchData({ url, method: "GET", token });
};
