import api from "../utils/api";

export const getProblems = async () => {

  const res = await api.get("/problems");

  return res.data;

};