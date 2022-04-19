const app = require('../app');
const axios = require('axios');
const Album = require('./models/Album');

const getAlbumDetails = async (artist, title) => {
  console.log(Album);
  try {
    const searchResults = await axios.get(
      `https://api.discogs.com/database/search?q=artist=${artist}&title=${title}&key=${process.env.DISCOGS_KEY}&secret=${process.env.DISCOGS_SECRET}`
    );
    const response = (
      await axios.get(searchResults.data.results[0].resource_url)
    ).data;
    const album = {
      format: response.formats[0].name,
      albumName: response.title,
      albumArt: searchResults.data.results[0].cover_image,
      artistName: response.artists[0].name,
      genre: response.genres[0],
      style: response.styles[0],
      year: response.year,
      price: response.lowest_price,
      albumDetails: response.notes,
      trackList: response.tracklist.map((x) => {
        return { track: x.position, title: x.title };
      }),
      rating: response.community.rating.average,
      availableInventory: response.num_for_sale,
    };
    await Album.create({ ...album });
  } catch (error) {
    console.log(error);
  }
};

getAlbumDetails('The Clash', 'London Calling');
// async function test(){await console.log('return value--------', realData);

// module.exports = realData;
