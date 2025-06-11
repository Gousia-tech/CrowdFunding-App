// src/components/Footer.jsx
import React from 'react';
import { Typography, Box, Link, Grid, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: 8,
      py: 4,
      backgroundColor: '#ffffff',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
      textAlign: 'center',
    }}
  >
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" sx={{ color: '#333', fontWeight: 500 }}>
          © 2025 SmileDonors Pvt. Ltd.
        </Typography>
        <Typography variant="body2" sx={{ color: '#777' }}>
          Empowering kindness, one donation at a time.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <IconButton
            color="primary"
            component={Link}
            href="https://facebook.com"
            target="_blank"
            sx={{ '&:hover': { color: '#3b5998' } }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="primary"
            component={Link}
            href="https://twitter.com"
            target="_blank"
            sx={{ '&:hover': { color: '#1DA1F2' } }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="primary"
            component={Link}
            href="https://instagram.com"
            target="_blank"
            sx={{ '&:hover': { color: '#C13584' } }}
          >
            <InstagramIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default Footer;
