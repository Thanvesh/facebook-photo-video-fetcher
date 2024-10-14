const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file


// Replace with your access token
const accessToken =process.env.IN_ACCESS_TOKEN

// Function to fetch Instagram media (photos and videos)
async function fetchInstagramMedia() {
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp&access_token=${accessToken}`;

  try {
    const response = await axios.get(url);
    const mediaItems = response.data.data;

    if (mediaItems.length > 0) {
      console.log("Fetched Media:");
      mediaItems.forEach(media => {
        console.log(`ID: ${media.id}`);
        console.log(`Caption: ${media.caption || 'No caption'}`);
        console.log(`Media Type: ${media.media_type}`);
        
        // Different handling for photos and videos
        if (media.media_type === 'IMAGE' || media.media_type === 'CAROUSEL_ALBUM') {
          console.log(`Media URL: ${media.media_url}`);
          console.log(`Thumbnail URL: ${media.thumbnail_url || 'No thumbnail'}`);
        } else if (media.media_type === 'VIDEO') {
          console.log(`Video URL: ${media.media_url}`); // Video URL
        }

        console.log(`Timestamp: ${media.timestamp}`);
        console.log('-----------------------------');
      });
    } else {
      console.log('No media found.');
    }
  } catch (error) {
    console.error('Error fetching media:', error.response ? error.response.data : error.message);
  }
}

// Call the function
fetchInstagramMedia();
