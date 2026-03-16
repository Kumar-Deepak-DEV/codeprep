import api from "../utils/api";

export const getGoals = async () => {

  const res = await api.get("/goals");

  return res.data;

};