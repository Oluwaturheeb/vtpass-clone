import request from "./axios";

export const getService = async () => {
  const services = await request.get('/entry-point');
  return services.data;
};

export const postAuth = async (url: string, payload: object) => {
  let auth = await request.post(url, payload);
  return auth.data;
};
