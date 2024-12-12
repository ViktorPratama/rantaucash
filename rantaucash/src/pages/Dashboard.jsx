import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Import CSS untuk Dashboard

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        // Mengambil data profil pengguna
        const userResponse = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(userResponse.data.user);
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          {userData ? (
            <div className="user-info">
              <p>Selamat datang, <strong>{userData.name}</strong></p>
              <p>Email: {userData.email}</p>
            </div>
          ) : (
            <p>Memuat data pengguna...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
