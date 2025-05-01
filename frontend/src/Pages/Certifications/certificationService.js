import axios from "axios";

const API_URL = "http://localhost:8080/api/certifications";

export const getCertifications = () => axios.get(API_URL);
export const getCertification = (id) => axios.get(`${API_URL}/${id}`);
export const createCertification = (data) => axios.post(API_URL, data);
export const updateCertification = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);
export const deleteCertification = (id) => axios.delete(`${API_URL}/${id}`);

// If you have certificate generation:
export const generateCertificate = (id) =>
  axios.post(`${API_URL}/${id}/generate`);
