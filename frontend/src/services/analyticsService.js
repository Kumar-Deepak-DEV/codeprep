import api from "../utils/api";

export const getAnalytics = async () => {

  const res = await api.get("/analytics");

  return res.data;

};