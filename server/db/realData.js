const app = require('../app');
const axios = require('axios');
const res = require('express/lib/response');

const sampleData = async () => {
  try {
    const response = (
      await axios.get('https://api.discogs.com/releases/22628222')
    ).data;
    const album = {
      //format included for sorting purposes
      format: response.formats[0].name,
      albumName: response.title,
      albumArt: 'authorization required',
      artistName: response.artists[0].name,
      genre: response.genres[0],
      year: response.year,
      price: response.lowest_price,
      responseDetails: response.notes,
      trackList: response.tracklist.map((x) => {
        return { track: x.position, title: x.title };
      }),
      rating: response.community.rating.average,
      availableInventory: response.num_for_sale,
    };
    // console.log(album);
  } catch (error) {
    console.log(error);
  }
};

const searchParam = 'Punk';

const searchTest = async () => {
  try {
    const searchResults = await axios.get(
      `https://api.discogs.com/database/search?q=${searchParam}&key=${process.env.DISCOGS_KEY}&secret=${process.env.DISCOGS_SECRET}`
    );
    for (let key in searchResults.data) {
      console.log(searchResults.data[key]);
    }
    // console.log(searchResults.data);
  } catch (error) {
    console.log(error);
  }
};

console.log(searchTest());
//

const realData = sampleData();

module.exports = realData;
