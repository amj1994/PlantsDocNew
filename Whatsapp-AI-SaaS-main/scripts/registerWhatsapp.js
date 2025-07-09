require('dotenv').config();
const axios = require("axios");

// Read environment variables
const WABA_ID = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const CERTIFICATE = `CnIKLgi98YPv5++HAxIGZW50OndhIhVQbGFudHMgRG9jIC0gRHJvcHpvbmVQ/4S6wwYaQMaL8+M3d7/A1Sg2WhG9Chdr28HC7kydmAFNJP2JCBHgd3kpWFpbSlkCbkf3MoZW+AUm6BPycTBQfXMdFS0STAwSL20RRaX59Z+O8FqytpyraSidXOfhX8H3BblIO4uLHPyvH94x8A94dwCT34CIA7qY`; // from cert.txt
const PIN = ""; // leave empty if no two-step verification PIN

async function registerWhatsapp() {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${WABA_ID}/register`,
      {
        messaging_product: "whatsapp",
        certificate: CERTIFICATE,
        ...(PIN && { pin: PIN }) // include only if set
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Registration successful:", response.data);
  } catch (error) {
    console.error("❌ Registration failed:", error.response?.data || error.message);
  }
}

registerWhatsapp();
