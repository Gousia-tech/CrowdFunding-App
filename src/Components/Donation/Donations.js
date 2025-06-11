import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Box, Paper } from "@mui/material";

const Donations = () => {
  const [showForm, setShowForm] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: (localStorage.getItem("email") || "").toLowerCase(), // email in lowercase
    amount: "",
  });

  const [orphanageName, setOrphanageName] = useState("");
  const [organisationEmail, setOrganisationEmail] = useState("");

  useEffect(() => {
    setOrphanageName(localStorage.getItem("selectedOrphanageName") || "");
    setOrganisationEmail((localStorage.getItem("selectedOrganisationEmail") || "").toLowerCase()); // lowercase
  }, []);

  const handleDonateClick = () => setShowForm(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "email" ? value.toLowerCase() : value, // force email to lowercase
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = formData.email.toLowerCase(); // Ensure lowercase again here

    if (!formData.name.trim()) return alert("Name is required");
    if (!formData.contact.trim() || formData.contact.length !== 10)
      return alert("Valid 10-digit contact number is required");
    if (!emailRegex.test(email)) return alert("Valid email is required");
    if (!formData.amount || formData.amount <= 0)
      return alert("A valid donation amount is required");

    const options = {
      key: "rzp_test_SQuXc5eembdWTP",
      amount: formData.amount * 100,
      currency: "INR",
      name: "Crowdfunding Platform",
      description: `Donation to ${orphanageName}`,
      handler: async function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);

        const donation = {
          donorEmail: email,
          donorName: formData.name,
          donorContact: formData.contact,
          organisationEmail: organisationEmail,
          organisationName: orphanageName,
          amount: formData.amount,
        };

        try {
          const result = await axios.post(`http://localhost:9092/donation/add`, donation);
          if (result.status === 200) {
            alert("Donation details stored successfully!");
            window.location.href = "/";
          } else {
            alert("Failed to store donation details!");
          }
        } catch (error) {
          console.error("Error storing donation details:", error);
          alert("Something went wrong while storing the details.");
        }
      },
      prefill: {
        name: formData.name,
        email: email,
        contact: formData.contact,
      },
      theme: { color: "#6096B4" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <Paper elevation={10} sx={{ maxWidth: 600, margin: "40px auto", padding: 4 }}>
      <h3>You are donating to {orphanageName}</h3>

      {showForm && (
        <Box
          component="form"
          onSubmit={handlePayment}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField label="Your Name" name="name" value={formData.name} onChange={handleInputChange} required />
          <TextField label="Your Contact" name="contact" value={formData.contact} onChange={handleInputChange} required />
          <TextField label="Your Email" name="email" value={formData.email} onChange={handleInputChange} required />
          <TextField type="number" label="Donation Amount (INR)" name="amount" value={formData.amount} onChange={handleInputChange} required />
          <Button type="submit" variant="contained">Confirm & Pay</Button>
        </Box>
      )}
    </Paper>
  );
};

export default Donations;
