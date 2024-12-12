// Authorization.jsx
import axios from 'axios';

const fetchData = async () => {
  // Ambil token dari localStorage
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get('http://localhost:5000/api/protected-route', {
      headers: {
        Authorization: `Bearer ${token}`, // Header Authorization
      },
    });

    console.log('Data fetched:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error.response?.data || error.message);
  }
};

fetchData();
