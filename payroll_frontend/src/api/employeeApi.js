import axios from "./axios";

export const getEmployees = () => axios.get("employees/");
export const addEmployee = (data) => axios.post("employees/", data);
export const deleteEmployee = (id) => axios.delete(`employees/${id}/`);
export const updateEmployee = (id, data) => axios.put(`employees/${id}/`, data);