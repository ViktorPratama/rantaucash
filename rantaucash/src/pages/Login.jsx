import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './Dashboard.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      
      try {
        setLoading(true);
        const response = await axios.get('https://backend-o47f.vercel.app/api/users/profile', {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        setUserData(response.data.user);
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
        
        // Cek jika error adalah unauthorized
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        
        setError(error.response?.data?.message || 'Gagal memuat data');
      } finally {
        setLoading(false);
      }
    };

    // Periksa token sebelum fetch
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData();
    } else {
      // Redirect ke halaman login jika tidak ada token
      window.location.href = '/login';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="dashboard loading">
          <div className="spinner"></div>
          <p>Memuat data...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="dashboard error">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Coba Lagi</button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="user-profile">
            <img 
              src={userData.avatar || '/default-avatar.png'} 
              alt="Profile" 
              className="profile-avatar" 
            />
            <div className="user-details">
              <h2>Selamat Datang, {userData.name}</h2>
              <p>{userData.email}</p>
            </div>
            <button 
              className="logout-btn" 
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Saldo</h3>
              <p>Rp {userData.balance?.toLocaleString() || '0'}</p>
            </div>
            <div className="stat-card">
              <h3>Total Transaksi</h3>
              <p>{userData.totalTransactions || 0}</p>
            </div>
          </div>

          <div className="dashboard-actions">
            <h3>Aksi Cepat</h3>
            <div className="action-buttons">
              <button 
                className="action-btn"
                onClick={() => window.location.href = '/topup'}
              >
                Top Up
              </button>
              <button 
                className="action-btn"
                onClick={() => window.location.href = '/withdraw'}
              >
                Tarik Dana
              </button>
              <button 
                className="action-btn"
                onClick={() => window.location.href = '/transfer'}
              >
                Transfer
              </button>
            </div>
          </div>

          <div className="recent-transactions">
            <h3>Transaksi Terakhir</h3>
            {userData.recentTransactions?.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Jenis</th>
                    <th>Jumlah</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.recentTransactions.slice(0, 5).map((transaction, index) => (
                    <tr key={index}>
                      <td>{new Date(transaction.date).toLocaleDateString()}</td>
                      <td>{transaction.type}</td>
                      <td>Rp {transaction.amount.toLocaleString()}</td>
                      <td>{transaction.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Belum ada transaksi</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
