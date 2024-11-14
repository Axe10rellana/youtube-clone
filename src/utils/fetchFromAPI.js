//axios
import axios from "axios";

//variables
const BASE_URL = "https://youtube-v31.p.rapidapi.com";
const API_KEY = import.meta.env.VITE_RAPID_API_KEY;

//validation
if (!API_KEY) {
  console.warn("La variable VITE_RAPID_API_KEY no está definida.");
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
});

//functions
export const fetchFromAPI = async (endpoint) => {
  try {
    const { data } = await axiosInstance.get(endpoint, {
      params: { maxResults: "50" },
    });
    return data;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
};
