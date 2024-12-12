import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Navbar from './Navbar';
import './payments.css';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payments/payments');
        console.log('Payments fetched:', response.data); // Memeriksa data pembayaran yang diterima
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };
    fetchPayments();
  }, []);
  
  const handlePaymentReminder = (paymentId) => {
    alert(`Reminder sent for Payment ID: ${paymentId}`);
    // Add logic to send reminder (e.g., email or notification)

    // Simulasi redirect ke halaman pemberitahuan
    window.location.href = `/reminders/${paymentId}`;
  };
  
  const handlePay = (paymentId) => {
    // Logika untuk memproses pembayaran
    alert(`Redirecting to QRIS payment page for Payment ID: ${paymentId}`);

    // Simulasi redirect ke halaman pembayaran QRIS
    window.location.href = `/pay/${paymentId}`;
  };
  
  return (
    <>
      <Navbar />
      <TableContainer component={Paper} className="TableContainer">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'white' }}>Payment ID</TableCell>
              <TableCell style={{ color: 'white' }}>Room Number</TableCell>
              <TableCell style={{ color: 'white' }}>User Name</TableCell> {/* Kolom User */}
              <TableCell style={{ color: 'white' }}>Amount</TableCell>
              <TableCell style={{ color: 'white' }}>Status</TableCell>
              <TableCell style={{ color: 'white' }}>Due Date</TableCell>
              <TableCell style={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.rooms?.room_number || 'No Room'}</TableCell>
                <TableCell>{payment.users?.name || 'Unknown User'}</TableCell> {/* Nama Pemilik */}
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>{payment.due_date}</TableCell>
                <TableCell>
                  <div className="button-group">
                    <Button
                      onClick={() => handlePaymentReminder(payment.id)}
                      variant="contained"
                      color="primary"
                      style={{ backgroundColor: '#2575fc', padding: '10px 25px', fontSize: '11px' }}
                    >
                      Reminder
                    </Button>
                    <Button
                      onClick={() => handlePay(payment.id)}
                      variant="contained"
                      color="secondary"
                    >
                      Pay
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PaymentHistory;
