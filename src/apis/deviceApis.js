import axios from 'axios';

const { VUE_APP_API_URL } = process.env;

export const getDevices = () => axios.get(VUE_APP_API_URL + '/devices');
export const postDevices = ({ deviceId, deviceNumber, deviceType }) =>
    axios.post(VUE_APP_API_URL + '/devices', {
        deviceId,
        deviceNumber,
        deviceType,
    });
export const editDevice = ({ docId, deviceId, deviceNumber, deviceType }) =>
    axios.put(VUE_APP_API_URL + '/devices' + `/${docId}`, {
        deviceId,
        deviceNumber,
        deviceType,
    });
export const deleteDevice = (docId) => axios.delete(VUE_APP_API_URL + '/devices' + `/${docId}`);
