const router = require('express').Router();
const axios = require('axios');
//reomove these at some point
const DISCOGS_KEY = 'iqaccrEsxevhQaumXCuv';
const DISCOGS_SECRET = 'egjaWRESFhqAxMEihyVHStXezYVOjqjN';
const {
  models: { Album },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const albums = await Album.findAll({});
    res.json(albums);
  } catch (err) {
    next(err);
  }
});

// curl -G localhost:8080/api/albums/search -d "style=Funk"

router.get('/search', async (req, res, next) => {
  try {
    // console.log(req.query);
    const rawData = await axios.get(
      `https://api.discogs.com/database/search?q=&${req.query.style}&page=1&per_page=5&key=${DISCOGS_KEY}&secret=${DISCOGS_SECRET}`
    );
    const searchResults = rawData.data.results;
    // console.log(searchResults);
    const output = [];
    for (let i = 0; i < searchResults.length; i++) {
      const response = await axios.get(searchResults[i].resource_url);
      const detail = response.data;
      // console.log('>>>', detail.id);
      const album = {
        // format: detail.formats[0].name,
        id: detail.id,
        albumName: detail.title,
        albumArt: searchResults[i].cover_image,
        thumbNail: searchResults[i].thumb,
        artistName: detail.artists[0].name,
        genre: detail.genres[0],
        style: detail.styles[0],
        year: detail.year,
        price: detail.lowest_price,
        albumDetails: detail.notes,
        trackList: detail.tracklist.map((track) => {
          return { position: track.position, title: track.title };
        }),
        rating: detail.community ? detail.community.rating.average : 0,
        availableInventory: detail.num_for_sale,
      };
      // console.log(album);
      if (album) {
        await Album.create({ ...album });
        output.push(album);
      }
    }
    res.send(output);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
