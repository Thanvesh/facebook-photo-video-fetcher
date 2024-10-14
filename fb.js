const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file


// Facebook Access Token
const accessToken = process.env.FB_ACCESS_TOKEN;
// User ID or 'me' to fetch the media of the logged-in user
const userId = 'me'; // or use a specific user id

// Function to fetch photos and videos in one call
async function fetchMedia() {
  const batchRequest = [
    { method: 'GET', relative_url: `${userId}/photos?type=uploaded&fields=id,album,name,picture,source` },
    { method: 'GET', relative_url: `${userId}/videos?fields=id,title,description,created_time,source` }
  ];

  try {
    const response = await axios.post(`https://graph.facebook.com/v17.0`, {
      access_token: accessToken,
      batch: batchRequest
    });

    const [photosResponse, videosResponse] = response.data.map(res => res.body ? JSON.parse(res.body) : null);

    // Helper function to display media
    const displayMedia = (media, type) => {
      if (media && media.data.length > 0) {
        console.log(`Fetched ${type}:`);
        media.data.forEach(item => {
          console.log(`ID: ${item.id}`);
          if (type === 'Photos') {
            console.log(`Source: ${item.source}`);
            console.log(`Thumbnail: ${item.picture}`);
            console.log(`Album: ${item.album ? item.album.name : 'No album info'}`);
          } else {
            console.log(`Title: ${item.title || 'No title'}`);
            console.log(`Description: ${item.description || 'No description'}`);
            console.log(`Created Time: ${item.created_time}`);
            console.log(`Source: ${item.source}`);
          }
          console.log('-----------------------------');
        });
      } else {
        console.log(`No ${type.toLowerCase()} Found.`);
      }
    };

    // Display fetched media
    displayMedia(photosResponse, 'Photos');
    displayMedia(videosResponse, 'Videos');

  } catch (error) {
    console.error('Error fetching media:', error.response ? error.response.data : error.message);
  }
}

// Call the function
fetchMedia();
