const axios = require('axios');
const Album = require('./models/Album');

const getAlbumDetails = async (artist, title) => {
  try {
    const searchResults = await axios.get(
      `https://api.discogs.com/database/search?q=artist=${artist}&title=${title}&key=${process.env.DISCOGS_KEY}&secret=${process.env.DISCOGS_SECRET}`
    );
    const response = (
      await axios.get(searchResults.data.results[0].resource_url)
    ).data;
    const album = {
      // format: response.formats[0].name,
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
    if (album) {
      await Album.create({ ...album });
    }
  } catch (error) {
    console.log(error);
  }
};

// getAlbumDetails('The Clash', 'London Calling');

const albumArray = [
  { artist: 'The Clash', title: 'London Calling' },
  { artist: 'Pink Floyd', title: 'The Dark Side Of The Moon' },
  { artist: 'Bruce Springsteen', title: 'Born To Run' },
  { artist: 'Simon and Garfunkel', title: 'Bridge Over Troubled Water' },
  { artist: 'Dr. Dre', title: 'The Chronic' },
  { artist: 'Michael Jackson', title: 'Off The Wall' },
  { artist: 'Fleetwood Mac', title: 'Rumours' },
  { artist: 'Eminem', title: 'The Marshall Mathers LP ' },
  { artist: 'DMX', title: "It's Dark And Hell Is Hot" },
  // { artist: 'The Clash', title: 'London Calling' },
  // { artist: 'The Clash', title: 'London Calling' },
  // { artist: 'The Clash', title: 'London Calling' },
  // { artist: 'The Clash', title: 'London Calling' },
  // { artist: 'The Clash', title: 'London Calling' },
  // { artist: 'The Clash', title: 'London Calling' },
  // { artist: 'The Clash', title: 'London Calling' },
  // { artist: 'The Clash', title: 'London Calling' },
  // { artist: 'The Clash', title: 'London Calling' },
  // { artist: 'The Clash', title: 'London Calling' },
  // { artist: 'The Clash', title: 'London Calling' },
  // { artist: 'The Clash', title: 'London Calling' },
  // { artist: 'The Clash', title: 'London Calling' },
];

const bulkGetAlbumDetails = (array) => {
  try {
    for (let i = 0; i < array.length; i++) {
      getAlbumDetails(array[i].artist, array[i].title);
    }
  } catch (error) {
    console.log(error);
  }
};

bulkGetAlbumDetails(albumArray);

// module.exports = realData;
