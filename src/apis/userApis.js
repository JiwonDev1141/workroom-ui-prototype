import axios from "axios";

const { VUE_APP_API_URL } = process.env;

export const getUser = () => axios.get(VUE_APP_API_URL + "/user/:id");
