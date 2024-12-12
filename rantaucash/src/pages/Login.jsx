import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Added state to manage password visibility
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userRole = decodedToken.role;

      // Redirect based on role and prevent back navigation
      if (userRole === 'pemilik') {
        navigate('/admin', { replace: true });
      } else if (userRole === 'penghuni') {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('rememberMe');
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userRole = decodedToken.role;

      // Redirect based on role and prevent back navigation
      if (userRole === 'pemilik') {
        navigate('/admin', { replace: true });
      } else if (userRole === 'penghuni') {
        navigate('/dashboard', { replace: true });
      }

      alert('Login successful');
    } catch (err) {
      console.error('Login Error:', err.response?.data || err.message);
      alert('Login failed!');
    }
  };

  return (
    <div className="login-container">
      <div className="welcome-section">
        <h1>Welcome to Rantau Cash</h1>
        <p>aplikasi membantu anak rantau untuk mengelola keuangan kos dan pengingat pembayaran.</p>
      </div>
      <div className="login-section">
        <h2>Login</h2>
        <p>Selamat datang, silahkan masukkan data anda!</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="checkbox-container">
            <input 
              type="checkbox" 
              id="rememberMe" 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)} 
            />
            <label className="remember" htmlFor="rememberMe" style={{ display: 'block', color:'black' }}>Remember me</label>
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="additional-links">
          <a href="/signup">New User? Signup</a>
          <a href="/forgot-password">Forgot your password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;