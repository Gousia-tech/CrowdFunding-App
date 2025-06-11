import React from 'react';
import { Typography, Box, Link, Grid, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 4,
      backgroundColor: "black", 
      boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)',
      borderTop: '1px solid rgba(0, 0, 0, 0.05)',
      textAlign: 'center',
    }}
  >
    <Grid container spacing={4} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" sx={{ color: '#d84315', fontWeight: 600 }}>
          © 2025 SmileDonors Pvt. Ltd.
        </Typography>
        <Typography variant="body2" sx={{ color: '#6d4c41' }}>
          Empowering kindness, one donation at a time.
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <IconButton
            component={Link}
            href="https://facebook.com"
            target="_blank"
            sx={{
              color: '#555',
              backgroundColor: '#e3f2fd',
              '&:hover': {
                backgroundColor: '#3b5998',
                color: '#fff',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            component={Link}
            href="https://twitter.com"
            target="_blank"
            sx={{
              color: '#555',
              backgroundColor: '#e0f7fa',
              '&:hover': {
                backgroundColor: '#1DA1F2',
                color: '#fff',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            component={Link}
            href="https://instagram.com"
            target="_blank"
            sx={{
              color: '#555',
              backgroundColor: '#fce4ec',
              '&:hover': {
                backgroundColor: '#C13584',
                color: '#fff',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <InstagramIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default Footer;
