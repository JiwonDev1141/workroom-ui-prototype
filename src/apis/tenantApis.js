import axios from "axios";

const { VUE_APP_API_URL } = process.env;

export const getTenants = ({ limit }) =>
  axios.get(`${process.env.VUE_APP_API_URL}/tenants?list=Y&limit=${limit}`);

export const postCreateTenant = ({
  tenantName,
  tenantId,
  tenantType,
  companyName,
  tenantStatus,
  // tenantOwner,
  companyCode,
}) =>
  axios.post(VUE_APP_API_URL + "/tenants", {
    tenantName,
    tenantId,
    tenantType,
    companyName,
    tenantStatus,
    // tenantOwner,
    companyCode,
  });
export const deleteTenant = (docId) =>
  axios.delete(VUE_APP_API_URL + "/tenants/" + `${docId}`);

export const editTenant = (
  docId,
  { tenantName, tenantId, tenantType, tenantStatus, companyCode, companyName }
) =>
  axios.put(VUE_APP_API_URL + "/tenants/" + `${docId}`, {
    tenantName,
    tenantId,
    tenantType,
    companyCode,
    companyName,
    // tenantOwner,
    tenantStatus,
  });
