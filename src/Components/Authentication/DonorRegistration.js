import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const DonorRegister = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formik = useFormik({
    initialValues: {
      donorFirstName: "",
      donorLastName: "",
      email: "",
      phoneNo: "",
      password: "",
    },
    validationSchema: Yup.object({
      donorFirstName: Yup.string()
        .matches(/^[a-zA-Z]+$/, "First name must contain only letters")
        .required("First name is required"),
      donorLastName: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Last name must contain only letters")
        .required("Last name is required"),
      email: Yup.string()
        .trim()
        .lowercase()
        .email("Invalid email format")
        .required("Email is required"),
      phoneNo: Yup.string()
        .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
        .required("Phone number is required"),
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
          "http://localhost:9090/api/auth/donor/auth/register",
          {
            ...values,
            email: values.email.trim().toLowerCase(),
          }
        );

        if (response.status === 200 || response.status === 201) {
          setSuccess("Registration successful! Redirecting to login...");
          setTimeout(() => navigate("/login/donor"), 1000);
        }
      } catch (error) {
        setError(error.response?.data?.message || "User already exists");
      }
    },
  });

  return (
    <Container maxWidth="xl" disableGutters sx={{ minHeight: "100vh" }}>
      <Grid
        container
        component={Paper}
        elevation={6}
        wrap="nowrap"
        sx={{ minHeight: "100vh" }}
      >
        {/* Left Side Image */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f1f8e9",
            overflow: "hidden",
          }}
        >
          <img
            src="/Assets/Login.png"
            alt="Register"
            style={{ width: "120%", height: "100%", objectFit: "fill" }}
          />
        </Grid>

        {/* Right Side Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            padding: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "100vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Donor Registration
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              {...formik.getFieldProps("donorFirstName")}
              error={formik.touched.donorFirstName && !!formik.errors.donorFirstName}
              helperText={
                formik.touched.donorFirstName ? formik.errors.donorFirstName : ""
              }
            />

            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              {...formik.getFieldProps("donorLastName")}
              error={formik.touched.donorLastName && !!formik.errors.donorLastName}
              helperText={
                formik.touched.donorLastName ? formik.errors.donorLastName : ""
              }
            />

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
              label="Phone Number"
              type="text"
              {...formik.getFieldProps("phoneNo")}
              error={formik.touched.phoneNo && !!formik.errors.phoneNo}
              helperText={formik.touched.phoneNo ? formik.errors.phoneNo : ""}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              {...formik.getFieldProps("password")}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password ? formik.errors.password : ""}
            />

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DonorRegister;
