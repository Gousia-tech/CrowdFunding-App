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

   Modal,

   Box

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

import OrgProfile from "./OrgProfile";

import Donations from "../Donation/Donations";
import AboutSection from "./AboutSection";
import  { useRef } from "react";

 
function LandingPage() {

  const [anchorEl, setAnchorEl] = useState(null);

  const [orphanages, setOrphanages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [isDonorPaneOpen, setIsDonorPaneOpen] = useState(false);

  const [isOrgPaneOpen, setIsOrgPaneOpen] = useState(false);
 
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const userRole = localStorage.getItem("userRole"); // "donor" or "organisation"
 
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const aboutRef = useRef(null);
  const orphanageRef=useRef(null);
  const contactRef=useRef(null);

const scrollToAbout = () => {
  if (aboutRef.current) {
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  }
};
const scrollToOrphanage = () => {
  if (orphanageRef.current) {
    orphanageRef.current.scrollIntoView({ behavior: "smooth" });
  }
};
const scrollToContact = () => {
  if (contactRef.current) {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  }
};
 
  const handleProfileClick = () => {

    if (userRole === "donor") setIsDonorPaneOpen(true);

    else if (userRole === "organisation") setIsOrgPaneOpen(true);

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

      img.src = base64Image.startsWith("data:image")

        ? base64Image

        : "data:image/png;base64," + base64Image;

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
 
  const carouselItems = [

    {

      image: "/assets/image1.jpg",

      text: "Smile Donor: Bringing Hope and Happiness",

    },

    {

      image: "/assets/image4.jpg",

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
 return (
<>
      {/* Header */}
<div style={{ backgroundColor: "tomato", minHeight: "100vh" }}>
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
    
    
              <Button color="inherit" onClick={scrollToAbout} sx={{
                      color: "#FFFDF6",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(3px)",
                      },
                    }}>
                About
    </Button>
    <Button color="inherit" onClick={scrollToOrphanage} sx={{
                      color: "#FFFDF6",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(3px)",
                      },
                    }}>
                Orphanages
    </Button>
    <Button color="inherit" onClick={scrollToContact} sx={{
                      color: "#FFFDF6",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(3px)",
                      },
                    }}>
                Contact Us
    </Button>
    
    
              {isLoggedIn ? (
    <Button
                  color="inherit"
                  startIcon={<AccountCircle />}
                  onClick={handleProfileClick}
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
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} PaperProps={{
        sx: {
          backgroundColor: "tomato", // Your desired background color
        },
      }} onClose={handleClose}>
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
    {/* Carousel */}
    <div style={{ position: "relative", overflow: "hidden", backgroundColor: "tomato" }}>
    <Slider {...sliderSettings}>
              {carouselItems.map((item, index) => (
    <div key={index}>
    <div
                    style={{
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
    
          {/* Testimonials */}
    <div>
    <TestimonialCarousel />
    </div>
    {/* Our Impact Section */}
    <div
                id="impact"
                style={{
                  // backgroundColor: "tomato",
                  //borderRadius: "12px",
                  padding: "40px 20px",
                  // marginTop: "50px",
                  textAlign: "center",
                  // boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                }}
    >
    
    
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  fontFamily: '"Great Vibes", cursive',
                  marginTop:"20px",
                  marginBottom: "30px",
                }}
    >
                Our Impact So Far
    </Typography>
    
              <Grid container spacing={4} justifyContent="center">
    <Grid item xs={12} sm={4}>
    <Card
                    sx={{
                      backgroundColor: "white",
                      color: "black",
                      padding: "20px",
                      borderRadius: "16px",
                      textAlign: "center",
                    }}
    >
    <Typography variant="h5" fontWeight="bold">
                      12,400+
    </Typography>
    <Typography variant="subtitle1">Donations Made</Typography>
    </Card>
    </Grid>
    <Grid item xs={12} sm={4}>
    <Card
                    sx={{
                      backgroundColor: "white",
                      color: "black",
                      padding: "20px",
                      borderRadius: "16px",
                      textAlign: "center",
                    }}
    >
    <Typography variant="h5" fontWeight="bold">
                      8,000+
    </Typography>
    <Typography variant="subtitle1">Global Donors</Typography>
    </Card>
    </Grid>
    <Grid item xs={12} sm={4}>
    <Card
                    sx={{
                      backgroundColor: "white",
                      color: "black",
                      padding: "20px",
                      borderRadius: "16px",
                      textAlign: "center",
                    }}
    >
    <Typography variant="h5" fontWeight="bold">
                      ₹2.5 Crores+
    </Typography>
    <Typography variant="subtitle1">Funds Raised</Typography>
    </Card>
    </Grid>
    </Grid>
    </div>

    
          {/* Orphanage Cards */}
    <div id ="orphanages" ref={orphanageRef}  >
      
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto", backgroundColor: "tomato" }}>
    <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginBottom: '25px', color: 'white', marginTop:'20px' }}>
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
                              //window.location.href = "/donate";
                              setIsDonationModalOpen(true);
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
    </div>
    <AboutSection aboutRef={aboutRef} />
    
            {/* Contact Section */}
            <div ref={contactRef}>
    <section id="contact" style={{ padding: "60px 20px", backgroundColor: "tomato", textAlign: "center" }}>
    <h2 style={{ fontSize: "32px", color: "white", marginBottom: "20px" }}>Contact Us</h2>
    <p style={{ fontSize: "18px", color: "white", maxWidth: "600px", margin: "0 auto " }}>
                We'd love to hear from you! Whether you have questions, suggestions, or just want to say hello — reach out to us.
    </p>
    <p style={{ fontSize: "16px", color: "white" }}>
                📧 Email: contact@smiledonors.org<br/>
                📞 Phone: +91 98765 43210
    </p>
    </section>
    </div>
    
    
            <div>
    <Footer />
    </div>
    
          </div>
    
          {/* Donor Sliding Pane */}
    <SlidingPane
            isOpen={isDonorPaneOpen}
            from="right"
            width="400px"
            onRequestClose={() => setIsDonorPaneOpen(false)}
            title="My Donor Profile"
            paneStyle={{ backgroundColor: "#fff8f0", color: "#333", padding: "20px" }}
            //hideHeader="true"
    >
    <ProfilePage onClosePane={() => setIsDonorPaneOpen(false)} />
    </SlidingPane>
    
          {/* Organisation Sliding Pane */}
    <SlidingPane
            isOpen={isOrgPaneOpen}
            from="left"
            width="800px"
            onRequestClose={() => setIsOrgPaneOpen(false)}
            title="Organisation Dashboard"
            paneStyle={{ backgroundColor: "#ffe4e1", color: "#111", padding: "25px" }}
            hideHeader="true"
    >
    <OrgProfile onClosePane={() => setIsOrgPaneOpen(false)} />
    </SlidingPane>
    <Modal
            open={isDonationModalOpen}
            onClose={() => setIsDonationModalOpen(false)}
            aria-labelledby="donation-modal"
            aria-describedby="donate-to-orphanage"
    >
    <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                maxHeight: "90vh",
                overflowY: "auto",
                width: "90%",
                maxWidth: "600px",
              }}
    >
    <Donations />
    </Box>
    </Modal>
  </div>
    
          {/* Footer */}
</>
  );
}
 
export default LandingPage;