const mapData = {
    cities: [
      {
        name: "Prayagraj",
        coordinates: { latitude: 25.4358, longitude: 81.8463 }
      },
      {
        name: "Varanasi",
        coordinates: { latitude: 25.3176, longitude: 82.9739 }
      },
      {
        name: "Lucknow",
        coordinates: { latitude: 26.8467, longitude: 80.9462 }
      },
      // Add more cities as needed
    ],
    placesNearPrayagraj: [
      {
        name: "Triveni Sangam",
        coordinates: { latitude: 25.4270, longitude: 81.8789 }
      },
      {
        name: "Allahabad Fort",
        coordinates: { latitude: 25.4485, longitude: 81.8427 }
      },
      {
        name: "Anand Bhawan",
        coordinates: { latitude: 25.4421, longitude: 81.8325 }
      },
      {
        name: "Khusro Bagh",
        coordinates: { latitude: 25.4415, longitude: 81.8465 }
      },
      {
        name: "Allahabad High Court",
        coordinates: { latitude: 25.4336, longitude: 81.8437 }
      },
      // Add more places in Prayagraj
    ],
    connections: {
      "Prayagraj": [
        "Triveni Sangam",
        "Allahabad Fort",
        "Anand Bhawan",
        "Khusro Bagh",
        "Allahabad High Court",
        // Add more connections from Prayagraj to other places
      ],
      // Add connections from other cities or places to nearby places
    }
  };
  
  console.log(mapData);
  