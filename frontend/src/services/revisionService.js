import api from "../utils/api";

export const getRevisionProblems = async () => {

  const res = await api.get("/revision");

  return res.data;

};