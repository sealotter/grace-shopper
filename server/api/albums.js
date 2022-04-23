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
        //GO BACK AND REMAKE SEED FILE WITH DISCOGS ID NUMBERS
        id: detail.id + 600,
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
        try {
          await Album.create({ ...album });
        } catch (error) {
          console.log(
            `album ${error.parameters[1]} by ${error.parameters[4]} already exists in DB`
          );
        }
        output.push(album);
      }
    }
    res.send(output);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.log('unique key violation: no data added');
      res.sendStatus(409);
    } else {
      next(error);
    }
  }
});

module.exports = router;
