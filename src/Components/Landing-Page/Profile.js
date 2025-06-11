import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Container,
  Paper,
  Box,
  Modal,
  TextField,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactSlidingPane from "react-sliding-pane";

const ProfilePage=({onClosePane})=> {
  const [donorData, setDonorData] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const donorEmail = localStorage.getItem("donorEmail");

  useEffect(() => {
    if (donorEmail) {
      fetchDonorData(donorEmail);
    }
  }, [donorEmail]);

  const fetchDonorData = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:9090/api/auth/donor/get/${email}`
      );
      setDonorData(response.data);
      setFormData({
        donorFirstName: response.data.donorFirstName,
        donorLastName: response.data.donorLastName,
        phoneNo: response.data.phoneNo,
      });
    } catch (error) {
      console.error("Error fetching donor data:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.donorFirstName?.trim()) {
      newErrors.donorFirstName = "First name is required.";
    } else if (!/^[A-Za-z]+$/.test(formData.donorFirstName)) {
      newErrors.donorFirstName = "Only letters are allowed.";
    }

    if (!formData.donorLastName?.trim()) {
      newErrors.donorLastName = "Last name is required.";
    } else if (!/^[A-Za-z]+$/.test(formData.donorLastName)) {
      newErrors.donorLastName = "Only letters are allowed.";
    }

    if (!formData.phoneNo?.trim()) {
      newErrors.phoneNo = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phoneNo)) {
      newErrors.phoneNo = "Phone number must be 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await axios.put(
        `http://localhost:9090/api/auth/donor/update/${donorEmail}`,
        formData
      );
      setMessage("Profile updated successfully!");
      setOpen(false);
      fetchDonorData(donorEmail); // Refresh
    } catch (error) {
      setMessage("Error updating profile.");
      console.error(error);
    }
  };

 const handlePasswordUpdate = async () => {
  if (newPassword.length < 8) {
    setPasswordError("Minimum 8 characters");
    return;
  }
  if (!/[a-z]/.test(newPassword)) {
    setPasswordError("At least one lowercase letter");
    return;
  }
  if (!/[A-Z]/.test(newPassword)) {
    setPasswordError("At least one uppercase letter");
    return;
  }
  if (!/[0-9]/.test(newPassword)) {
    setPasswordError("At least one number");
    return;
  }
  if (!/[@$!%*?&]/.test(newPassword)) {
    setPasswordError("At least one special character (@$!%*?&)");
    return;
  }

  try {
    await axios.put(
      `http://localhost:9090/api/auth/donor/update/password/${donorEmail}/${newPassword}`
    );
    setMessage("Password updated successfully!");
    setShowPasswordField(false);
    setNewPassword("");
    setPasswordError("");
  } catch (error) {
    setMessage("Failed to update password.");
    console.error(error);
  }
};


  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    if(onClosePane) onClosePane();
  };

  if (!donorData) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography><strong>First Name:</strong> {donorData.donorFirstName}</Typography>
          <Typography><strong>Last Name:</strong> {donorData.donorLastName}</Typography>
          <Typography><strong>Email:</strong> {donorData.email}</Typography>
          <Typography><strong>Phone:</strong> {donorData.phoneNo}</Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography
            variant="body2"
            sx={{
              textDecoration: "underline",
              color: "primary.main",
              cursor: "pointer",
              mt: 2,
            }}
            onClick={() => setShowPasswordField(true)}
          >
            Change Password
          </Typography>

          {showPasswordField && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordError("");
                }}
                error={!!passwordError}
                helperText={passwordError}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="contained" color="primary" onClick={handlePasswordUpdate}>
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setShowPasswordField(false);
                    setNewPassword("");
                    setPasswordError("");
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </Box>

        {message && (
          <Alert
            sx={{ mt: 2 }}
            severity={message.toLowerCase().includes("success") ? "success" : "error"}
          >
            {message}
          </Alert>
        )}

        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Update Profile
          </Button>

          <Button variant="contained" color="success" onClick={() => navigate("/my-donations")}>
            My Donations
          </Button>

          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Paper>

      {/* Modal for updating profile */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Update Profile
          </Typography>

          <TextField
            fullWidth
            label="First Name"
            name="donorFirstName"
            value={formData.donorFirstName}
            onChange={handleInputChange}
            error={!!errors.donorFirstName}
            helperText={errors.donorFirstName}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="donorLastName"
            value={formData.donorLastName}
            onChange={handleInputChange}
            error={!!errors.donorLastName}
            helperText={errors.donorLastName}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleInputChange}
            error={!!errors.phoneNo}
            helperText={errors.phoneNo}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={donorData.email}
            disabled
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

export default ProfilePage;
