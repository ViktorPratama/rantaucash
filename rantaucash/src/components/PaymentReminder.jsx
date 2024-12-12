import { useState } from 'react';
import axios from 'axios';

const PaymentReminder = () => {
  const [reminderDate, setReminderDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSetReminder = async () => {
    try {
      await axios.post('http://localhost:5000/api/payments/reminder', { date: reminderDate });
      setMessage('Reminder set successfully!');
    } catch (error) {
      setMessage('Failed to set reminder.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h3>Set Payment Reminder</h3>
      <input
        type="date"
        value={reminderDate}
        onChange={(e) => setReminderDate(e.target.value)}
      />
      <button onClick={handleSetReminder}>Set Reminder</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PaymentReminder;
