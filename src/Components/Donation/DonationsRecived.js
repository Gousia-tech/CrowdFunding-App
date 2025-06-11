import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button, Box, Typography, Paper, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, TextField, DialogActions,IconButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const DonationsReceived = () => {
  const [donationsReceived, setDonationsReceived] = useState([]);
  const [orgEmail, setOrgEmail] = useState("");
  const [orgName, setOrgName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [openReviewBox, setOpenReviewBox] = useState(false);
  const navigate = useNavigate();

  // Set email on mount
  useEffect(() => {
    const email = localStorage.getItem("orgemail") || "";
    setOrgEmail(email);
  }, []);

  // Fetch donations once email is set
  useEffect(() => {
    if (orgEmail) {
      fetchDonationsReceived();
    }
  }, [orgEmail]);

  const fetchDonationsReceived = async () => {
    try {
      const response = await axios.get(`http://localhost:9092/donation/get-org/${orgEmail}`);
      setDonationsReceived(response.data);
 
      // Extract organization details from first donation (assuming it's consistent)
      if (response.data.length > 0) {
        setOrgName(response.data[0].organisationName);
       
      }
    } catch (error) {
      console.error("Error fetching Donations Received:", error);
      alert("Failed to fetch Donations Received!");
    }
  };
  const submitReview = async () => {
    if (!reviewText.trim()) {
      alert("Please enter a review before submitting.");
      return;
    }
 
    const reviewData = {
      orgName,
      orgEmail,
      review: reviewText,
    };
 
    try {
      await axios.post(`http://localhost:9093/review/org`, reviewData);
      alert("Review submitted successfully!");
      setReviewText("");
      setOpenReviewBox(false);
      window.location.href="/";
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  };

  return (
    <Box sx={{ backgroundColor: "tomato", minHeight: "100vh", padding: 4 }}>
      <Paper
        elevation={10}
        sx={{
          maxWidth: 600,
          margin: "40px auto",
          padding: 4,
          backgroundColor: "#F7F9FB",
          borderRadius: 12,
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
        }}
      >
        <Box position="relative" mb={3}>
          <IconButton
            onClick={() => navigate("/")}
            sx={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}
          >
            <ArrowBackIcon sx={{ color: "#4E342E" }} />
          </IconButton>
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 600,
              color: "#4E342E",
            }}
          >
            Donations Received
          </Typography>
        </Box>

        <Typography
          variant="body2"
          align="center"
          sx={{ color: "#6C757D", marginBottom: 2 }}
        >
          Track the donations contributed to your organization.
        </Typography>

        {donationsReceived.length > 0 ? (
          <List sx={{ backgroundColor: "#FFFFFF", padding: 2, borderRadius: 8 }}>
            {donationsReceived.map((donation) => (
              <ListItem
                key={donation.id}
                sx={{ borderBottom: "1px solid #E0E0E0", paddingY: 1 }}
              >
                <ListItemText
                  primary={`Donor Name: ${donation.donorName}`}
                  secondary={`Amount: ${donation.amount} INR`}
                  sx={{
                    primaryTypographyProps: {
                      style: { color: "#355070", fontWeight: 500 },
                    },
                    secondaryTypographyProps: {
                      style: { color: "#6C757D" },
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box textAlign="center" mt={2}>
            <Typography
              variant="body1"
              sx={{ color: "#355070", fontStyle: "italic" }}
            >
              {orgEmail ? "No donations found." : "Loading..."}
            </Typography>
          </Box>
        )}
        <Box textAlign="center" mt={3}>
        <Button
          variant="outlined"
          sx={{
            backgroundColor: "#FFC107",
            ":hover": { backgroundColor: "#E0A800" },
            color: "#FFF",
            paddingX: 3,
          }}
          onClick={() => setOpenReviewBox(true)}
          disabled={!orgName || !orgEmail} // Disable if org details are missing
        >
          Leave a Review
        </Button>
      </Box>
 
      {/* Review Dialog */}
      <Dialog open={openReviewBox} onClose={() => setOpenReviewBox(false)}>
        <DialogTitle>Submit Your Review</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReviewBox(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={submitReview}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      </Paper>
    </Box>
  );
};

export default DonationsReceived;
