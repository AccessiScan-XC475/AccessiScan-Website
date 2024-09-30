# AccessiScan Website - Improve Accessibility for your Projects!
This project consists of three pieces: 1) chrome extension 2) core website and 3) a scanning api. This is the repository for the core website where users can learn about our project, connect with other users in a community board, and be referred to relevant resources of accessibility for websites.

## Dev Docs
### Requirements:
- [Golang 1.23](https://go.dev/doc/install)
- [Node 22.9 ](https://nodejs.org/en/download/prebuilt-installer)
- [Air](https://github.com/air-verse/air) ``` go install github.com/air-verse/air@latest ```
### Configure .env.local 
- Set the following variables 
```
  ENVIRONMENT="dev"
  DB_NAME="AccessiScan-"
  MONGO_URI="mongodb_srv..." # get this full value from MongoDB website after selecting Golang as the driver
```
### Running locally 
- Use the command ```npm install``` to ensure you have all dependencies installed
- Use the command ```npm run dev```. Lines starting with "[0]" are output from the frontend and lines starting with "[1]" are output from the backend
- The website should now be accessible at [http://localhost:3000](http://localhost:3000)
### System Architecture 
- Learn more about our [chrome extension](https://github.com/AccessiScan-XC475/AccessiScan-Chrome-Extension)
- Learn more about out [scanner API](https://github.com/AccessiScan-XC475/AccessiScan-Scanner)

![image](https://github.com/user-attachments/assets/3d158fa5-a971-407c-a71f-b19ecd0981c3)
