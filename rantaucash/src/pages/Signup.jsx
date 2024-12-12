import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Added state to manage password visibility
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://backend-o47f.vercel.app/api/users/register', {
        name,
        email,
        password,
        role: 'penghuni', // Automatically set role to penghuni
      });

      alert('Registration successful!');
      navigate('/'); // Redirect to login after successful registration
    } catch (err) {
      console.error('Registration Error:', err.response?.data || err.message);
      alert('Registration failed!');
    }
  };

  return (
    <div className="signup-container">
      <div className="welcome-section">
        <h1>Join Rantau Cash</h1>
        <p>aplikasi membantu anak rantau untuk mengelola keuangan kos dan pengingat pembayaran.</p>
      </div>
      <div className="signup-section">
        <h2>Signup</h2>
        <p>Buat Akun Sesuai Data Diri Anda!!!</p>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button type="submit">Signup</button>
        </form>
        <div className="additional-links">
          <a href="/">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
