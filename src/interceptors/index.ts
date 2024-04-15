export const onRequestFulFilled = (config) => {
  return config;
};
export const onRequestReject = (err) => {
  return err.response;
};
export const onResponseFulFilled = (res) => {
  return res;
};
export const onResponseReject = (err) => {
  return Promise.reject(err);
};
