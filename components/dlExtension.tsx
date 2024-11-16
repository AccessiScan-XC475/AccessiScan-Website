import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const DlExtension: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: '4rem 2rem',
        backgroundColor: '#fbfbfb',
        borderRadius: '20px',
        margin: '2rem 0',
        transition: 'box-shadow 0.3s ease-in-out', // Smooth transition for box-shadow
        "&:hover": {
          boxShadow: '0px 10px 30px rgba(84, 189, 134, 0.4)', // Shadow appears when hovered
        },
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontFamily: 'inherit', color: '#1B6AAA', fontWeight: '500' }}>
        Download AccessiScan Chrome Extension!
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ fontFamily: 'inherit'}}>
        Get the best experience by adding our Chrome Extension. Click below to download.
      </Typography>
      
      <a href="https://chromewebstore.google.com/detail/accessiscan-chrome-extens/ahoojddljcjmlgfbbpbbcpgnmjekkafn?authuser=0&hl=en" target="_blank" rel="noopener noreferrer">
        <img
          src="/path/to/chrome-extension-image.png"
          alt="Download Chrome Extension"
          style={{
            width: '200px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease-in-out', // Smooth transition for scaling
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </a>

      <Box sx={{ marginTop: '2rem' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          href="https://github.com/your-github-repo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download from GitHub
        </Button>
      </Box>
    </Box>
  );
};

export default DlExtension;
