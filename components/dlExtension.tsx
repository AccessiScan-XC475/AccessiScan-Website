import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import iconImage from '../app/icon.png';

const DlExtension: React.FC = () => {
  return (
    <Box
      sx={{
        transform: 'scale(0.7)', // Scale down the entire box to 80% of its original size
        transformOrigin: 'center', // Scale from the center
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '-1.5rem',
        marginBottom: '-2rem',
      }}
    >
    <Box
      sx={{
        textAlign: 'center',
        padding: '4rem 2.5rem',
        backgroundColor: '#fbfbfb',
        borderRadius: '20px',
        margin: '0 auto',
        border: '1px solid #d3d3d3',
        transition: 'box-shadow 0.3s ease-in-out', // Smooth transition for box-shadow
        "&:hover": {
          boxShadow: '0px 10px 30px rgba(84, 189, 134, 0.4)', // Shadow appears when hovered
        },
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontFamily: 'inherit', color: '#1B6AAA', fontSize: '2.5rem', fontWeight: '550' }}>
        Download AccessiScan Chrome Extension
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ fontFamily: 'inherit', fontSize: '1.4rem'}}>
        Click below to view our Chrome Extension in the Chrome Web Store!
      </Typography>
      
      <Box
        sx={{
          display: 'flex', // Use flexbox to ensure centering
          justifyContent: 'center', // Horizontal centering
          alignItems: 'center', // Vertical centering (if needed)
          marginTop: '2rem',
        }}
      >
        <a href="https://chromewebstore.google.com/detail/accessiscan-chrome-extens/ahoojddljcjmlgfbbpbbcpgnmjekkafn?authuser=0&hl=en" target="_blank" rel="noopener noreferrer">
          <img
            src={iconImage.src}
            alt="Download Chrome Extension"
            style={{
              width: '100px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease-in-out',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.animation = 'bounce 0.5s infinite alternate';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.animation = 'none';
            }}
          />
        </a>
      </Box>

      <style jsx>{`
        @keyframes bounce {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </Box> 
    </Box>
  );
};

export default DlExtension;
