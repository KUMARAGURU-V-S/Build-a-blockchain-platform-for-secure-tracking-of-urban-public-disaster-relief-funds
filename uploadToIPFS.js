const axios = require('axios');
const path=require('path');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();

const filePath = path.join(__dirname,'yesyoucan.jpg'); // Replace with your file
const formData = new FormData();
formData.append('file', fs.createReadStream(filePath));

axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
  maxBodyLength: 'Infinity',
  headers: {
    ...formData.getHeaders(),
    pinata_api_key: process.env.PINATA_API_KEY,
    pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
  }
}).then(res => {
  console.log("✅ File uploaded!");
  console.log("CID:", res.data.IpfsHash);
  console.log("Public URL:", `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`);
}).catch(err => {
  console.error("❌ Error uploading:", err);
});
