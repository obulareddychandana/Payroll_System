import axios from "./axios";

export const getPayroll = () => axios.get("payroll/");
export const addPayroll = (data) => axios.post("payroll/", data);