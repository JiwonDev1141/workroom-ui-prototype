import axios from "axios";

const { VUE_APP_API_URL } = process.env;

export const getSettings = () =>
  axios.get(`${process.env.VUE_APP_API_URL}/settings?list=Y`);

export const postCreateSetting = ({ settingName, settingId, settingType }) =>
  axios.post(VUE_APP_API_URL + "/settings", {
    settingName,
    settingId,
    settingType,
  });
export const deleteSetting = (docId) =>
  axios.delete(VUE_APP_API_URL + "/settings/" + `${docId}`);

export const createService = (docId, { datas }) =>
  axios.put(VUE_APP_API_URL + "/settings/service/add/" + `${docId}`, {
    datas,
  });

export const editService = ({ docId, serviceCode }, { datas }) =>
  axios.put(
    VUE_APP_API_URL +
      "/settings/service/edit/" +
      `${docId}?serviceCode=${serviceCode}`,
    {
      datas,
    }
  );

export const removeService = ({ docId, serviceCode }) =>
  axios.put(
    VUE_APP_API_URL +
      "/settings/service/remove/" +
      `${docId}?serviceCode=${serviceCode}`
  );
