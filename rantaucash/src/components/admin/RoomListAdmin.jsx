import { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, ListItemIcon, Paper, Typography } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import Navbar from './NavbarAdmin'; 

const RoomListAdmin = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms/kamar');
        console.log('Rooms data:', response.data);  // Check if data is received
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <>
      <Navbar />
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          List of Rooms
        </Typography>
        <List>
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <ListItem key={room.uuid}>
                <ListItemIcon>
                  <BedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`Room ${room.room_number}`}
                  secondary={`Price: Rp ${room.price.toLocaleString()} | Owner: ${room.users?.name || 'Unknown'}`}  // Display owner name
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              No rooms available.
            </Typography>
          )}
        </List>
      </Paper>
    </>
  );
};

export default RoomListAdmin;