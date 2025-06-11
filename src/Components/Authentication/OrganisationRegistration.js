import React from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const OrgRegisterForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState('');

  const validationSchema = Yup.object().shape({
    orphanageName: Yup.string().required('Orphanage Name is required'),
    organiserFirstName: Yup.string().required('First Name is required'),
    organiserLastName: Yup.string().required('Last Name is required'),
    orphanagePhoneNumber: Yup.string()
      .matches(/^\d{10}$/, 'Enter a valid 10-digit phone number')
      .required('Phone number is required'),
    regNo: Yup.string().required('Registration Number is required'),
    email: Yup.string()
      .trim()
      .lowercase()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Minimum 8 characters')
      .matches(/[a-z]/, 'At least one lowercase letter')
      .matches(/[A-Z]/, 'At least one uppercase letter')
      .matches(/[0-9]/, 'At least one number')
      .matches(/[@$!%*?&]/, 'At least one special character (@$!%*?&)'),
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
      await axios.post('http://localhost:9090/api/auth/org/auth/register', data);
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login/organisation'), 2000);
    } catch (error) {
      setMessage('User Already Exist');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <Grid
        container
        component={Paper}
        elevation={3}
        wrap="nowrap"
        sx={{
          minHeight: '100vh',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Left Side Image */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f3f3f3',
          }}
        >
          <img
            src="/assets/Login.png"
            alt="Register"
            style={{ width: '120%', height: '100%',maxHeight: '100%', objectFit: 'fill' }}
          />
        </Grid>

        {/* Right Side Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            padding: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '100vh',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Organization Registration
          </Typography>

          {message && (
            <Alert
              severity={message.includes('successful') ? 'success' : 'error'}
              sx={{ mb: 2 }}
            >
              {message}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {[
              { name: 'orphanageName', label: 'Orphanage Name' },
              { name: 'organiserFirstName', label: 'Organizer First Name' },
              { name: 'organiserLastName', label: 'Organizer Last Name' },
              { name: 'orphanagePhoneNumber', label: 'Phone Number' },
              { name: 'regNo', label: 'Registration Number' },
              { name: 'email', label: 'Email', type: 'email' },
              { name: 'password', label: 'Password', type: 'password' },
            ].map(({ name, label, type = 'text' }) => (
              <Controller
                key={name}
                name={name}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={label}
                    type={type}
                    fullWidth
                    margin="normal"
                    error={!!errors[name]}
                    helperText={errors[name]?.message}
                  />
                )}
              />
            ))}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Register
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already registered? <Link to="/login/organisation">Login</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrgRegisterForm;
