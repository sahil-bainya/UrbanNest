const axios = require("axios");

async function getCoordinates(address) {
  const url = "https://nominatim.openstreetmap.org/search";

  const res = await axios.get(url, {
    params: {
      q: address,
      format: "json"
    },
    headers: {
      "User-Agent": "my-airbnb-app (your@email.com)"
    }
  });

  if (res.data.length > 0) {
    return {
      lat: res.data[0].lat,
      lng: res.data[0].lon
    };
  }
  return null;
}

// ✅ EXPORT THIS (most important line)
module.exports = getCoordinates;