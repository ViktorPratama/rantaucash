import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './NavbarAdmin.css';

const NavbarAdmin = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prevState => !prevState);

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
        </div>
        <div className={`navbar-right ${menuOpen ? 'open' : ''}`}>
          <Button color="inherit" component={Link} to="/admin" className="navbar-button">
            Admin Panel
          </Button>
          <Button color="inherit" component={Link} to="/rooms-admin" className="navbar-button">
            Rooms
          </Button>
          <Button color="inherit" component={Link} to="/payments-admin" className="navbar-button">
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

export default NavbarAdmin;
