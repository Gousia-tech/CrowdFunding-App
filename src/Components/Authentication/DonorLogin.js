import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  Grid,
  Box,
  Paper,
  Link as MuiLink,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
 
const DonorLogin = () => {
  const [error, setError] = useState("");
 
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .lowercase()
        .email("Enter a valid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Minimum 8 characters")
        .matches(/[a-z]/, "At least one lowercase letter")
        .matches(/[A-Z]/, "At least one uppercase letter")
        .matches(/[0-9]/, "At least one number")
        .matches(/[@$!%*?&]/, "At least one special character (@$!%*?&)"),
    }),
    onSubmit: async (values) => {
      try {
            const response = await axios.post(
            "http://localhost:9090/api/auth/donor/auth/login",
                      {
                        ...values,
            email: values.email.trim().toLowerCase(),
                      }
                    );
            
                    if (response.status === 200) {
            const donorData = response.data;
 
            if (!donorData.email) {
                        console.error("Error: Donor email not returned from API!");
                        setError("Login failed: No email received.");
                        return;
                      }
            
                      localStorage.setItem("isLoggedIn", "true");
                      localStorage.setItem("donorEmail", donorData.email);
                      localStorage.setItem("donorToken", donorData.token);
                      localStorage.setItem("userRole", "donor"); // or "organisation"

            
                      window.location.href = "/";
                    }
                  } catch (err) {
                    setError(err.response?.data?.message || "Invalid credentials.");
                  }
              },
           });
 
  return (
    <Container maxWidth="lg">
      <Grid container component={Paper} elevation={6}>
        {/* Left Image Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fbe9e7",
            }}
          >
            <img
              src="/assets/Login.png"
              alt="Login"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Grid>
 
        {/* Right Login Form Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Donor Login
            </Typography>
 
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                {...formik.getFieldProps("email")}
error={formik.touched.email && !!formik.errors.email}
helperText={formik.touched.email ? formik.errors.email : ""}
              />
 
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                {...formik.getFieldProps("password")}
                error={formik.touched.password && !!formik.errors.password}
                helperText={
                  formik.touched.password ? formik.errors.password : ""
                }
              />
 
              {error && <Alert severity="error">{error}</Alert>}
 
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </form>
 
            {/* <Button
              variant="contained"
              color="secondary"
              fullWidth
              component={Link}
              to="/register/donor"
              sx={{ mt: 2 }}
            >
              Sign Up as Donor
            </Button> */}
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don't have an account?{' '}
                <MuiLink component={Link} to="/register/donor" underline="hover">
                  Sign up here
                </MuiLink>
              </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
 
export default DonorLogin;