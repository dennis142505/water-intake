export const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

export const saveUsers = (users) =>
  localStorage.setItem("users", JSON.stringify(users));

export const setLoggedUser = (user) =>
  localStorage.setItem("loggedUser", JSON.stringify(user));

export const getLoggedUser = () =>
  JSON.parse(localStorage.getItem("loggedUser"));

export const logoutUser = () => localStorage.removeItem("loggedUser");

export const getIntakes = () => JSON.parse(localStorage.getItem("intakes")) || [];

export const saveIntakes = (intakes) =>
  localStorage.setItem("intakes", JSON.stringify(intakes));
