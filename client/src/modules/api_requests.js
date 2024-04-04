const BASE_URL = "http://localhost:8000/api/user";

const fetchData = async (url, method, data) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    localStorage.setItem("token", responseData.token);

    return responseData;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
};

export const login = async (loginData) => {
  const url = `${BASE_URL}/login`;
  return fetchData(url, "POST", loginData);
};

export const register = async (registerData) => {
  const url = `${BASE_URL}/register`;
  return fetchData(url, "POST", registerData);
};
