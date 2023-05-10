import axios from "axios";

const { VUE_APP_API_URL } = process.env;

export const postSignUp = ({
  email,
  password,
  password2,
  username,
  phoneNum,
}) =>
  axios.post(VUE_APP_API_URL + "/users", {
    email,
    password,
    password2,
    userName: username,
    phoneNum,
    userType: "G",
    userId: Math.random().toString(),
  });

export const postSignIn = ({ email, password }) =>
  axios.post(VUE_APP_API_URL + "/users/login", {
    email,
    password,
  });
