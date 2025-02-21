import apiClient from './apiClient';

export const memoryService = {
  async saveMemory(memoryData) {

  },

  async getProjectMemories(projectId, limit = 20) {
    const response = await axios.get(
      `${API_URL}/memory/project/${projectId}?limit=${limit}`
    );
    return response.data;
  },

  async updateRelevance(memoryId, relevance) {
    const response = await axios.patch(
      `${API_URL}/memory/${memoryId}/relevance`,
      { relevance }
    );
    return response.data;
  },

  async getMemories() {
    const response = await axios.get(`${API_URL}/memory`);
    return response.data;
  },
};