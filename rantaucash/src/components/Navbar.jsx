import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios'; // Import axios untuk permintaan API

const Navbar = () => {
  const [notifications, setNotifications] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payments/notifications');
        setNotifications(response.data.count); // Ambil jumlah notifikasi
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <AppBar className="navbar-root">
      <Toolbar className="navbar-toolbar">
        <div className="navbar-left">
          <IconButton
            edge="start"
            aria-label="menu"
            className="navbar-menu-icon"
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="navbar-title">
            RantauCash
          </Typography>
          <div style={{ marginLeft: '20px' }}>
            <IconButton
              color="inherit"
              component={Link}
              to="/notifications"
              className="navbar-notification-icon"
            >
              <Badge badgeContent={notifications} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </div>
        </div>
        <div className={`navbar-right ${menuOpen ? 'open' : ''}`}>
          <Button color="inherit" component={Link} to="/dashboard" className="navbar-button">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/rooms" className="navbar-button">
            Rooms
          </Button>
          <Button color="inherit" component={Link} to="/payments" className="navbar-button">
            Payments
          </Button>
          <Button color="inherit" onClick={handleLogout} className="navbar-button">
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
