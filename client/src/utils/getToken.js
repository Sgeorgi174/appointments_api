export const getToken = () => {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  return user.token;
};
