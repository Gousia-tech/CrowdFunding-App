import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import axios from 'axios'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
 
 
 
 
const settings = {
  dots: true,
  infinite: true,
  fade: true, // Enables fade transition
  speed: 1000, // Transition duration
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000, // Change slide every 4 seconds
  arrows: false,
  pauseOnHover: false, // Ensure continuous rotation
}
 
 
 
const TestimonialCarousel = () => {
  const [reviews, setReviews] = useState([])
 
  useEffect(() => {
    axios.get(`http://localhost:9093/review/get-org/reviews`)
      .then(async (orgResponse) => {
        const orgData = orgResponse.data;
 
        axios.get(`http://localhost:9093/review/get-donor/reviews`)
          .then(async (donorResponse) => {
            const donorData = donorResponse.data;
 
            const formattedReviews = [
              ...orgData.map(review => ({
                name: review.orgName,
                role: 'Orphanage',
                message: review.review,
              })),
              ...donorData.map(review => ({
                name: review.donorName,
                role: 'Donor',
                message: review.review,
              })),
            ];
 
            setReviews(formattedReviews.sort(() => Math.random() - 0.5));
          })
          .catch(err => console.error("Failed to fetch donor reviews:", err));
      })
      .catch(err => console.error("Failed to fetch orphanage reviews:", err));
  }, []);
 
  return (
    <div style={{ backgroundColor: 'tomato' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', color: 'white' }}>
          What People Are Saying
        </h2>
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} style={{ padding: '20px' }}>
              <div
                style={{
                  borderRadius: '15px',
                  padding: '30px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#fff',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontStyle: 'italic' }}>"{review.message}"</p>
                <div style={{ marginTop: '15px' }}>
                  <strong>{review.name}</strong>
                  <p style={{ color: '#888', fontSize: '14px' }}>{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
 
export default TestimonialCarousel
 