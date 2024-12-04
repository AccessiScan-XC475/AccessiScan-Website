import React from "react";
import { Box, Typography } from "@mui/material";
import iconImage from "../app/icon.png";
import Image from "next/image";
import Link from "next/link";

const DlExtension: React.FC = () => {
  return (
    <Link
      href="https://chromewebstore.google.com/detail/accessiscan-chrome-extens/ahoojddljcjmlgfbbpbbcpgnmjekkafn?authuser=0&hl=en"
      target="_blank"
      onMouseOver={() => {
        const logo = document.getElementById("logo");
        if (logo) {
          logo.style.animation = "bounce 0.5s infinite alternate";
        }
      }}
      onMouseOut={() => {
        const logo = document.getElementById("logo");
        if (logo) {
          logo.style.animation = "none";
        }
      }}
      className="mt-6 mb-8 p-0 flex justify-center items-center scale-75"
    >
      <Box
        sx={{
          textAlign: "center",
          width: "40rem",
          backgroundColor: "#fbfbfb",
          borderRadius: "20px",
          margin: "-2rem",
          border: "1px solid #d3d3d3",
          transition: "box-shadow 0.3s ease-in-out", // Smooth transition for box-shadow
          "&:hover": {
            boxShadow: "0px 10px 30px rgba(84, 189, 134, 0.4)", // Shadow appears when hovered
          },
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontFamily: "inherit",
            color: "#1B6AAA",
            fontSize: "2rem",
            fontWeight: "550",
          }}
        >
          Add the AccessiScan Extension
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{ fontFamily: "inherit", fontSize: "1.4rem" }}
        >
          Click below to view our extension in the Chrome Web Store!
        </Typography>

        <Box
          sx={{
            display: "flex", // Use flexbox to ensure centering
            justifyContent: "center", // Horizontal centering
            alignItems: "center", // Vertical centering (if needed)
            marginTop: "2rem",
          }}
        >
          <Image
            id="logo"
            src={iconImage.src}
            alt="Download Chrome Extension"
            width={100}
            height={100}
          />
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
    </Link>
  );
};

export default DlExtension;
