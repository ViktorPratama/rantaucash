// PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace />; // Redirect to login if token not found
  }

  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const userRole = decodedToken.role; // Mengambil role dari token

  // Cek apakah user memiliki role yang diizinkan
  if (allowedRoles.includes(userRole)) {
    return element;
  }

  return <Navigate to="/" replace />; // Redirect if role is not allowed
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PrivateRoute;