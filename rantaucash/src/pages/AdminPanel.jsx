// Di AdminPanel.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/admin/NavbarAdmin';

const AdminPanel = () => {  
  const [data, setData] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
          const token = localStorage.getItem('token'); // Ambil token dari localStorage

          try {
              const response = await axios.get('http://localhost:5000/api/users/profile', {
                  headers: {
                      Authorization: `Bearer ${token}`, // Kirim token di header
                  },
              });
              setData(response.data);
          } catch (err) {
              console.error('Error fetching data:', err.response?.data || err.message);
              alert('Failed to fetch data. Please login again.');
          }
      };

      fetchData();
  }, []);
  
  return (
    <>
      <Navbar />
      <div>
            <h2>Admin Panel</h2> 
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
        </div>
    </>
  );
};

export default AdminPanel;
