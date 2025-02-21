import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const projectService = {
  async getAllProjects() {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  },

  async createProject(projectData) {
    const response = await axios.post(`${API_URL}/projects`, projectData);
    return response.data;
  },

  async updateProject(id, projectData) {
    const response = await axios.put(`${API_URL}/projects/${id}`, projectData);
    return response.data;
  },

  async getProjectSettings(id) {
    const response = await axios.get(`${API_URL}/projects/${id}/settings`);
    return response.data;
  }
};