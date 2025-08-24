import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface DonationData {
  donor: string;
  contact: string;
  date: string;
  time: string;
  items: string;
  location: string;
  notes?: string;
}

export const api = {
  createDonation: async (data: DonationData) => {
    try {
      const response = await axios.post(`${API_URL}/donations`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDonations: async (status?: string) => {
    try {
      const response = await axios.get(`${API_URL}/donations`, {
        params: { status }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateDonationStatus: async (id: string, status: string) => {
    try {
      const response = await axios.put(`${API_URL}/donations/${id}`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
