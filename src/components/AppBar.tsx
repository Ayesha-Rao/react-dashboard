

import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; 

const Navbar = () => {
  return (
    <AppBar position="static" color="default" sx={{ boxShadow: 'none', bgcolor: 'white' }}>
      <Toolbar>
       
        <IconButton edge="start" color="primary" aria-label="menu">
          <MenuIcon /> 
        </IconButton>

       
        <Typography variant="h6" style={{ flexGrow: 1, color: 'black' }}>
          Project Management
        </Typography>

       
        <Box display="flex" alignItems="center">
          <Button color="primary" variant="contained" sx={{ mt: 4, bgcolor: '#6A1B9A' , borderRadius: 14, mb: 4}}>
            Feedback
          </Button>
          <Typography variant="body1" sx={{ mr: 2, color: 'black' }}>
            Hi, James Doe
          </Typography>
          <Avatar alt="James Doe" src="images/avatar.jpg" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

