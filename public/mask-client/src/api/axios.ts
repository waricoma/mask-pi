import axiosBase from "axios";

export const axios = axiosBase.create({
  baseURL: `http://${window.location.host}`,
  headers: {
    "content-type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
  },
  responseType: "json",
});
