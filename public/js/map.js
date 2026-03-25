  // 📍 STEP 1: Set initial coordinates (Latitude, Longitude)
  // Change these values to move the map to another city
   const lng = coordinates[0];
  const lat = coordinates[1];

  // convert to Leaflet format [lat, lng]
  const leafletCoords = [lat, lng];

  // 📍 STEP 2: Initialize the map
  // 'map' is the id of the div above
  const map = L.map('map').setView(leafletCoords, 13);
  // 13 = zoom level (higher = more zoomed in)

  // 🗺️ STEP 3: Add map tiles (OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors' // required credit
  }).addTo(map);

  // 📌 STEP 4: Add a marker at given location
  const marker = L.marker(leafletCoords).addTo(map);

  // 💬 STEP 5: Add popup text to marker
  marker.bindPopup(`
  <div style="width:100px">
    <img src="${listing.image.url}" width="100%" style="border-radius:10px;"><br>
    <b>${listing.title}</b><br>
    📍 ${listing.location}<br>
  </div>
`);

  // -------------------------------
  // 🔧 THINGS YOU CAN MODIFY
  // -------------------------------

  // 1️⃣ Change location:
  //    Update latitude & longitude values

  // 2️⃣ Change zoom:
  //    Replace 13 with:
  //    - 5  → country view
  //    - 10 → city view
  //    - 15 → street view

  // 3️⃣ Change popup text:
  //    Replace "Your Location" with anything
  //    Example: "My Airbnb Listing"

  // 4️⃣ Add multiple markers:
  // Example:
  /*
  L.marker([23.25, 77.41]).addTo(map).bindPopup("Place 1");
  L.marker([23.27, 77.45]).addTo(map).bindPopup("Place 2");
  */
 