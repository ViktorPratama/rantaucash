import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import RoomList from './components/RoomList';
import PaymentHistory from './components/PaymentHistory';
import PrivateRoute from './components/PrivateRoute';
import RoomListAdmin from './components/admin/RoomListAdmin';
import PaymentHistoryAdmin from './components/admin/PaymentHistoryAdmin';
import PaymentQR from './components/PaymentQR';
import PaymentReminder from './components/PaymentReminder';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Menggunakan PrivateRoute untuk halaman yang memerlukan autentikasi */}
        <Route 
          path="/dashboard" 
          element={<PrivateRoute allowedRoles={['penghuni', 'pemilik']} element={<Dashboard />} />} 
        />
        
        <Route path="/rooms" element={<RoomList />} />
        
        {/* AdminPanel route hanya untuk pemilik */}
        <Route 
          path="/admin" 
          element={<PrivateRoute allowedRoles={['pemilik']} element={<AdminPanel />} />} 
        />
        
        <Route path="/payments" element={<PaymentHistory />} />


        {/*ADMIN*/}
        <Route path="/rooms-admin" element={< RoomListAdmin/>} />
        <Route path="/payments-admin" element={<PaymentHistoryAdmin />} />

        {/*PAYMENTS*/}
        <Route path="/pay/:id" element={<PaymentQR />} />
        <Route path="/reminders" element={<PaymentReminder />} />

        {/* Signup */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
