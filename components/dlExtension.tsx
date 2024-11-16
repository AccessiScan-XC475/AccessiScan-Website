import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import extensionImage from './extension.png';

const DlExtension: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: '4rem 2rem',
        backgroundColor: '#fbfbfb',
        borderRadius: '20px',
        margin: '2rem 0',
        border: '1px solid #d3d3d3',
        transition: 'box-shadow 0.3s ease-in-out', // Smooth transition for box-shadow
        "&:hover": {
          boxShadow: '0px 10px 30px rgba(84, 189, 134, 0.4)', // Shadow appears when hovered
        },
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontFamily: 'inherit', color: '#1B6AAA', fontWeight: '500' }}>
        Download AccessiScan Chrome Extension
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ fontFamily: 'inherit'}}>
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
            src={extensionImage.src}
            alt="Download Chrome Extension"
            style={{
              width: '150px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease-in-out',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </a>
      </Box>
    </Box> 
  );
};

export default DlExtension;
