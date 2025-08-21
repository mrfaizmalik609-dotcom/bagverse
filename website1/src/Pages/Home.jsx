import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bagImage from '../assets/images/bag.jpg';
import bag1 from '../assets/images/bag1.jpg';
import home1 from '../assets/images/home-1.jpg';
import home2 from '../assets/images/home-2.jpg';
import home3 from '../assets/images/home-3.jpg';
import home4 from '../assets/images/home-4.jpg';
import home5 from '../assets/images/home-5.jpg';
import home6 from '../assets/images/home-6.jpg';

function Home() {
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(bagImage);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const images = [bagImage, bag1];
    let index = 0;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        index = (index + 1) % images.length;
        setMainImage(images[index]);
        setFade(true);
      }, 600);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const imageCardStyle = {
    width: '350px',
    height: '400px',
    borderRadius: '10px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
    objectFit: 'cover',
    transition: 'transform 0.3s ease, box-shadow 0.3s',
    cursor: 'pointer',
    marginBottom: '30px',
    gap: '20px'
  };

  return (
    <div
      style={{
        paddingBottom: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: '#f9fafc',
      }}
    >
      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      {/* ✅ Fullscreen Hero Section */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          marginBottom: '60px',
        }}
      >
        <img
          src={mainImage}
          alt="Main"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            animation: fade ? 'fadeInScale 1.2s ease forwards' : 'none',
            zIndex: 0,
          }}
        />

        <button
          onClick={() => navigate('/product')}
          style={{
            position: 'relative',
            zIndex: 1,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '14px 30px',
            fontSize: '18px',
            backgroundColor: '#ff6666',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            backdropFilter: 'blur(5px)',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#ff4c4c';
            e.target.style.transform = 'translate(-50%, -50%) scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#ff6666';
            e.target.style.transform = 'translate(-50%, -50%) scale(1)';
          }}
        >
          Shop Now
        </button>
      </div>

      {/* 🔳 First Row of Images */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '70px',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '1200px',
          marginBottom: '40px',
        }}
      >
        {[home1, home2, home3].map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Home ${index + 1}`}
            loading="lazy"
            style={imageCardStyle}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.04)';
              e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)';
            }}
          />
        ))}
      </div>

      {/* 🔲 Second Row of Images */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '70px',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        {[home4, home5, home6].map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Home ${index + 4}`}
            loading="lazy"
            style={imageCardStyle}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.04)';
              e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)';
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
