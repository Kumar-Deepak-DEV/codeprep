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

/* Connect LeetCode session for full-history sync */
export const connectLeetCodeSession = async ({ sessionCookie, csrfToken }) => {
  const res = await api.put("/profile/leetcode-session", {
    sessionCookie,
    csrfToken
  });
  return res.data;
};

/* Disconnect LeetCode session (falls back to public recent-only sync) */
export const disconnectLeetCodeSession = async () => {
  const res = await api.delete("/profile/leetcode-session");
  return res.data;
};

/* Trigger an on-demand sync */
export const triggerSync = async () => {
  const res = await api.post("/sync");
  return res.data;
};
