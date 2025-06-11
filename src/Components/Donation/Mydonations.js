import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button, Box, Typography, Paper, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, TextField, DialogActions,IconButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const MyDonations = () => {
  const [myDonations, setMyDonations] = useState([]);
  const [donorEmail, setDonorEmail] = useState("");
  const [donorName, setDonorName] = useState("");
 
  const [reviewText, setReviewText] = useState("");
  const [openReviewBox, setOpenReviewBox] = useState(false);
  const navigate = useNavigate();

  // Set body background to tomato on mount
  useEffect(() => {
    document.body.style.backgroundColor = "tomato";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  // Set donorEmail from localStorage
  useEffect(() => {
    const email = localStorage.getItem("donorEmail") || "";
    setDonorEmail(email);
  }, []);

  // Fetch donations when donorEmail is available
  useEffect(() => {
    if (donorEmail) {
      fetchMyDonations();
    }
  }, [donorEmail]);

  const fetchMyDonations = async () => {
    try {
      const response = await axios.get(`http://localhost:9092/donation/get-donor/${donorEmail}`);
      setMyDonations(response.data);
      console.log(response.data);
 
      // Extract donor details from first donation (assuming it's consistent)
      if (response.data.length > 0) {
        setDonorName(response.data[0].donorName);
       
      }
    } catch (error) {
      console.error("Error fetching My Donations:", error);
      alert("Failed to fetch My Donations!");
    }
  };
  const submitReview = async () => {
    if (!reviewText.trim()) {
      alert("Please enter a review before submitting.");
      return;
    }
 
    const reviewData = {
      donorName,
      donorEmail,
      review: reviewText,
    };
 
    try {
      await axios.post(`http://localhost:9093/review/donor`, reviewData);
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
    <Paper
      elevation={10}
      sx={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 4,
        backgroundColor: "#F7F9FB",
        borderRadius: 12,
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
      }}
    >
      {/* Back Button and Title */}
      <Box display="flex" alignItems="center" mb={4}>
        <IconButton onClick={() => navigate("/")}>
          <ArrowBackIcon sx={{ color: "#4E342E" }} />
        </IconButton>
        <Typography
        textAlign="center"
          variant="h4"
          sx={{ fontWeight: 600, color: "#4E342E", marginLeft: 1 }}
        >
          My Donations
        </Typography>
      </Box>

      <Box display="flex" gap={4} alignItems="flex-start" justifyContent="center">
        {/* Left Column: Image */}
        <Box flex={1}>
          <img
            src="Assets/thankyou1.png"
            alt="Thank you"
            style={{ width: "100%", borderRadius: 12 }}
          />
        </Box>

        {/* Right Column: Donation List */}
        <Box flex={1}>
          <Typography variant="body2" sx={{ color: "#6C757D", mb: 2 }}>
            View your contribution details.
          </Typography>

          {myDonations.length > 0 ? (
            <List sx={{ backgroundColor: "#FFFFFF", padding: 2, borderRadius: 8 }}>
              {myDonations.map((donation) => (
                <ListItem
                  key={donation.id}
                  sx={{ borderBottom: "1px solid #E0E0E0", paddingY: 1 }}
                >
                  <ListItemText
                    primary={`Organization Name: ${donation.organisationName}`}
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
            <Typography variant="body1" sx={{ color: "#355070", fontStyle: "italic" }}>
              {donorEmail ? "No donations found." : "Loading..."}
            </Typography>
          )}
        </Box>
      </Box>
      {/* Review Button */}
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
          disabled={!donorName || !donorEmail} // Disable if donor details are missing
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
  );
};

export default MyDonations;
