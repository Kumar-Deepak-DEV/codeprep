import api from "../utils/api";

/* Fetch user profile */

export const getProfile = async () => {

  const res = await api.get("/profile");

  return res.data;

};


/* Update platform handles */

export const updatePlatforms = async (platformData) => {

  const res = await api.put("/profile/platform", platformData);

  return res.data;

};