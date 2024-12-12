import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';

const PaymentQR = () => {
  const { id } = useParams(); // Ambil ID dari URL
  console.log('Received ID:', id); // Debugging log untuk memeriksa ID yang diterima  
    const [paymentDetails, setPaymentDetails] = useState(null);
  
    useEffect(() => {
        const fetchPaymentDetails = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/payments/pay/${id}`);
            console.log('Response:', response.data); // Debugging
            setPaymentDetails(response.data);
          } catch (error) {
            console.error('Error fetching payment details:', error);
          }
        };
        fetchPaymentDetails();
      }, [id]);
      
  
    if (!paymentDetails) {
      return <Typography>Loading payment details...</Typography>;
    }
  
    const roomNumber = paymentDetails.rooms?.room_number || 'Unknown Room';
  
    return (
      <Box display="flex" flexDirection="column" alignItems="center" marginTop={5}>
        <Typography variant="h5" gutterBottom>
          Payment QRIS for Room Number: {roomNumber}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Amount: {paymentDetails.amount}
        </Typography>
        <Box
          component="img"
          src="https://www.xendit.co/wp-content/uploads/2023/06/How-to-Enable-QR-Payments-for-Your-Business.jpeg"
          alt="QR Code"
          sx={{ margin: '20px', width: 200, height: 200 }}
        />
        <Typography variant="body2">
          Scan this QR code with your preferred QRIS-compatible app to make the payment.
        </Typography>
        <Button
          variant="contained"
          color="success"
          sx={{ marginTop: '20px' }}
          onClick={() => {
            alert('Payment verification in progress');
            window.location.href = '/payments';
          }}
        >
          Confirm Payment
        </Button>
      </Box>
    );
  };
  
  export default PaymentQR;