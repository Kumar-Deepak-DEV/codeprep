import api from "../utils/api";

export const getProblems = async () => {
  const res = await api.get("/problems");
  return res.data;
};

export const addProblem = async (problemData) => {
  const res = await api.post("/problems", problemData);
  return res.data;
};

export const deleteProblem = async (id) => {
  const res = await api.delete(`/problems/${id}`);
  return res.data;
};