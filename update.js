 const fs = require('fs');
const axios = require('axios');

const apiKey = process.env.YOUTUBE_API_KEY;
const channelId = 'UCpJeTnyVBgetrmP06Gl-avQ';
const maxResults = 6;

async function fetchVideos() {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`;

  try {
    const response = await axios.get(url);
    const items = response.data.items;

    const videos = items
      .filter(item => item.id.kind === 'youtube#video')
      .map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title
      }));

    fs.writeFileSync('videos.json', JSON.stringify(videos, null, 2));
    console.log('videos.json updated successfully.');
  } catch (error) {
    console.error('Error fetching YouTube data:', error.message);
    process.exit(1);
  }
}

fetchVideos();
