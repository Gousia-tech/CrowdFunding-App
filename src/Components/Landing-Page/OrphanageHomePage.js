import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Menu,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Slider from "react-slick";
import Footer from "../Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialCarousel from "./TestimonialCarousel";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import ProfilePage from "./Profile";
import OrgProfile from "./OrgProfile"; // <-- added

function LandingPage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [orphanages, setOrphanages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole"); // "donor" or "organisation"

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function convertBase64ToJpeg(base64Image) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const jpegBase64 = canvas.toDataURL("image/jpeg", 0.9);
        resolve(jpegBase64);
      };
      img.onerror = (err) => reject(err);
      if (!base64Image.startsWith("data:image")) {
        img.src = "data:image/png;base64," + base64Image;
      } else {
        img.src = base64Image;
      }
    });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:9091/orphanages/get/all`)
      .then(async (response) => {
        const orphanagesData = response.data;
        const orphanagesWithJpegImages = await Promise.all(
          orphanagesData.map(async (orph) => {
            if (orph.mainImage) {
              try {
                const jpegImage = await convertBase64ToJpeg(orph.mainImage);
                return { ...orph, mainImage: jpegImage };
              } catch (err) {
                console.error("Image conversion failed:", err);
                return orph;
              }
            }
            return orph;
          })
        );
        setOrphanages(orphanagesWithJpegImages);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orphanages:", err);
        setError("Failed to load orphanages.");
        setLoading(false);
      });
  }, []);

  const carouselItems = [
    {
      image: "/assets/image1.jpg",
      text: "Smile Donor: Bringing Hope and Happiness",
    },
    {
      image: "/assets/image2.jpg",
      text: "Every Child Deserves a Loving Home",
    },
    {
      image: "/assets/image3.jpg",
      text: "Together, We Can Make a Difference",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes heartbeat {
        0% { transform: scale(1); }
        14% { transform: scale(1.1); }
        28% { transform: scale(1); }
        42% { transform: scale(1.1); }
        70% { transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "tomato" }}>
        <Toolbar>
          <a href="/">
            <img
              src="/assets/logonew2.png"
              alt="Smile Donor Logo"
              style={{
                height: 60,
                marginRight: 20,
                marginTop: 10,
                animation: "heartbeat 1.5s infinite",
                transformOrigin: "center",
              }}
            />
          </a>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              color: "#FFFDF6",
              fontFamily: '"Great Vibes", cursive',
              fontSize: "2.4rem",
              marginTop: "20px",
            }}
          >
            Smile Donors
          </Typography>

          {isLoggedIn ? (
            <Button
              color="inherit"
              startIcon={<AccountCircle />}
              onClick={() => setIsPaneOpen(true)}
              sx={{ color: "#FFFDF6" }}
            >
              Profile
            </Button>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={handleMenuOpen}
                sx={{
                  color: "#FFFDF6",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(3px)",
                  },
                }}
              >
                Login
              </Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem
                  component={Link}
                  to="/login/donor"
                  onClick={handleClose}
                  sx={{
                    backgroundColor: "tomato",
                    color: "white",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#ff6347",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  Login as Donor
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/login/organisation"
                  onClick={handleClose}
                  sx={{
                    backgroundColor: "tomato",
                    color: "white",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#ff6347",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  Login as Organisation
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Carousel Section */}
      <div style={{ position: "relative", overflow: "hidden", backgroundColor: "tomato" }}>
        <Slider {...sliderSettings}>
          {carouselItems.map((item, index) => (
            <div key={index}>
              <div
                style={{
                  position: "relative",
                  height: "85vh",
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    fontFamily: '"Great Vibes", cursive',
                    textAlign: "center",
                  }}
                >
                  {item.text}
                </Typography>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div><TestimonialCarousel /></div>

      {/* Orphanages Section */}
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto", backgroundColor: "tomato" }}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginBottom: '25px', color: 'white' }}>
          Spreading smiles is a click away
        </h2>
        {loading ? (
          <Typography>Loading orphanages...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : orphanages.length === 0 ? (
          <Typography>No orphanages available at the moment.</Typography>
        ) : (
          <Grid container spacing={3}>
            {orphanages.map((orphanage) => (
              <Grid item xs={12} sm={6} md={4} key={orphanage.id}>
                <Card>
                  {orphanage.mainImage && (
                    <img
                      src={orphanage.mainImage}
                      alt={orphanage.orphanageName}
                      style={{ width: "100%", height: 200, objectFit: "cover" }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6">{orphanage.orphanageName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {orphanage.address}
                    </Typography>
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      Orphans: {orphanage.orphans}
                    </Typography>
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      Goal: ₹{orphanage.goal.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      Donation Received: ₹{orphanage.donationReceived.toLocaleString()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        localStorage.setItem("selectedOrphanageName", orphanage.orphanageName);
                        localStorage.setItem("selectedOrganisationEmail", orphanage.emailId);
                        window.location.href = "/donate";
                      }}
                    >
                      Donate
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <Footer />
      </div>

      {/* Sliding Profile Pane */}
      <SlidingPane
        isOpen={isPaneOpen}
        from="right"
        width="400px"
        onRequestClose={() => setIsPaneOpen(false)}
        title={null}
        paneStyle={{ backgroundColor: "tomato", padding: "20px", color: "white" }}
        hideHeader="true"
      >
        {userRole === "donor" ? (
          <ProfilePage onClosePane={() => setIsPaneOpen(false)} />
        ) : userRole === "organisation" ? (
          <OrgProfile onClosePane={() => setIsPaneOpen(false)} />
        ) : (
          <Typography>Unknown role</Typography>
        )}
      </SlidingPane>
    </>
  );
}

export default LandingPage;
