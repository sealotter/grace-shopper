//this route was for testing, can probably be removed

const router = require('express').Router();
const axios = require('axios');
const {
  models: { Album },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const users = await Album.findAll({});
    res.json(users);
  } catch (err) {
    next(err);
  }
});

const artist = 'The Clash';
const title = 'London Calling';
router.get('/test', async (req, res) => {
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
      // trackList: response.tracklist.map((x) => {
      //   return { track: x.position, title: x.title };
      // }),
      rating: response.community.rating.average,
      availableInventory: response.num_for_sale,
    };
    await Album.create(album);
    res.send(album);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
