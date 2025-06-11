import React from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Alert,
  Link as MuiLink,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
 
const OrganisationLogin = () => {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState('');
 
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .lowercase()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });
 
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
 
  const onSubmit = async (data) => {
    try {
const response = await axios.post('http://localhost:9090/api/auth/org/auth/login', data);
localStorage.setItem('orgemail', data.email.toLowerCase().trim());
localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("userRole", "organisation"); // or "organisation"

      window.location.href = "/";
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
      console.error(error);
    }
  };
 
  return (
    <Container maxWidth="lg" disableGutters>
      <Grid
        container
        sx={{
          minHeight: '100vh',
          flexDirection: { xs: 'column', md: 'row' },
        }}
        component={Paper}
        elevation={3}
      >
        {/* Left side image */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: { xs: 300, md: '100%' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fce4ec',
            }}
          >
            <img
              src="/assets/Login.png"
              alt="Login"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Grid>
 
        {/* Right side form */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: 5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Organization Login
            </Typography>
 
            {message && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {message}
              </Alert>
            )}
 
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    margin="normal"
error={!!errors.email}
helperText={errors.email?.message}
                  />
                )}
              />
 
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
 
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Login
              </Button>
 
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don't have an account?{' '}
                <MuiLink component={Link} to="/register/organisation" underline="hover">
                  Sign up here
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
 
export default OrganisationLogin;