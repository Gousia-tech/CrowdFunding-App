import React from "react";

const AboutSection = ({ aboutRef }) => {
  const sectionStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "60px 20px",
    backgroundColor: "tomato",
    flexWrap: "wrap",
    textAlign: "left",
  };

  const greyBoxStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    backgroundColor: "rgba(128, 128, 128, 0.15)", // Transparent grey
    padding: "40px",
    borderRadius: "12px",
    width: "100%",
    boxSizing: "border-box",
  };

  const contentStyle = {
    flex: 1,
    color: "white",
    paddingRight: "20px",
    maxWidth: "600px",
    marginLeft: "100px",
  };

  const headingStyle = {
    fontSize: "32px",
    marginBottom: "20px",
  };

  const paragraphStyle = {
    fontSize: "18px",
    lineHeight: "1.6",
  };

  const imageContainerStyle = {
    flex: 1,
    textAlign: "center",
    marginTop: "20px",
  };

  const imageStyle = {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "8px",
  };

  return (
    <section style={sectionStyle}>
      <div style={greyBoxStyle} ref={aboutRef}>
        <div style={contentStyle}>
          <h2 style={headingStyle}>About SmileDonors</h2>
          <p style={paragraphStyle}>
            SmileDonors is a platform that connects generous donors with verified orphanages.
            Our goal is to bring transparency, trust, and ease to the process of giving and supporting children in need.
            Every donation you make helps shape a better future for someone.
          </p>
        </div>
        <div style={imageContainerStyle}>
          <img src="/Assets/imageAbout.png" alt="About SmileDonors" style={imageStyle} />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
