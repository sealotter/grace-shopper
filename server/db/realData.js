const axios = require('axios');
const Album = require('./models/Album');

const getAlbumDetails = async (artist, title) => {
  try {
    const searchResults = await axios.get(
      `https://api.discogs.com/database/search?q=artist=${artist}&title=${title}&page=1&per_page=1&key=${process.env.DISCOGS_KEY}&secret=${process.env.DISCOGS_SECRET}`
    );
    console.log(searchResults.data);
    const response = (
      await axios.get(searchResults.data.results[0].resource_url)
    ).data;
    const album = {
      // format: response.formats[0].name,
      albumName: response.title,
      albumArt: searchResults.data.results[0].cover_image,
      thumbNail: searchResults.data.results[0].thumb,
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

// bulkGetAlbumDetails(albumArray);

const getAlbumsByGenre = async (genre) => {
  try {
    const rawData = await axios.get(
      `https://api.discogs.com/database/search?q=&genre=${genre}&page=1&per_page=22&key=${process.env.DISCOGS_KEY}&secret=${process.env.DISCOGS_SECRET}`
    );
    const searchResults = rawData.data.results;
    // console.log(searchResults);
    for (let i = 0; i < searchResults.length; i++) {
      const response = (await axios.get(searchResults[i].resource_url)).data;
      console.log(response);
      const album = {
        // format: response.formats[0].name,
        albumName: response.title,
        albumArt: searchResults[i].cover_image,
        thumbNail: searchResults[i].thumb,
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
    }
  } catch (error) {
    console.log(error);
  }
};

getAlbumsByGenre('Electronic');
