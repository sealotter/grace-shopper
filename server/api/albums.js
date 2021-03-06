const router = require('express').Router();
const axios = require('axios');
//reomove these at some point
const DISCOGS_KEY = 'iqaccrEsxevhQaumXCuv';
const DISCOGS_SECRET = 'egjaWRESFhqAxMEihyVHStXezYVOjqjN';
//
const {
  models: { Album },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const albums = await Album.findAll({});
    res.send(albums);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const album = await Album.findByPk(req.body.album.id);
    await album.update(req.body.album);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.put('/admin/albums/:id', async (req, res, next) => {
  try {
    const album = await Album.findByPk(req.params.id);
    res.send(await album.update(req.body)).status(204)
  } catch (error) {
    next(error);
  }
});

// curl -G localhost:8080/api/albums/search -d "style=style=Funk"

router.post('/search', async (req, res, next) => {
  try {
    let statusCode = 201;
    const rawData = await axios.get(
      `https://api.discogs.com/database/search?q=${req.body.query}&page=1&per_page=5&key=${DISCOGS_KEY}&secret=${DISCOGS_SECRET}`
    );
    const searchResults = rawData.data.results;
    // console.log(searchResults);
    const output = [];
    for (let i = 0; i < searchResults.length; i++) {
      const response = await axios.get(searchResults[i].resource_url);
      const detail = response.data;
      // console.log(detail);
      const album = {
        id: detail.id,
        albumName: detail.title,
        albumArt: searchResults[i].cover_image,
        thumbNail: searchResults[i].thumb,
        artistName: detail.artists ? detail.artists[0].name : 'various artists',
        genre: detail.genres ? detail.genres[0] : 'unknown',
        style: detail.styles ? detail.styles[0] : null,
        year: detail.year ? detail.year : 'date unknown',
        price: detail.lowest_price,
        albumDetails: detail.notes,
        trackList: detail.tracklist
          ? detail.tracklist.map((track) => {
              return { position: track.position, title: track.title };
            })
          : 'track list unavailable',
        rating: detail.community ? detail.community.rating.average : 0,
        availableInventory: detail.num_for_sale,
      };
      // console.log(album);
      if (album) {
        try {
          await Album.create({ ...album });
        } catch (error) {
          if (error.original) {
            console.log(
              `album ${error.original.parameters[1]} by ${error.original.parameters[4]} already exists`
            );
          } else {
            console.log(error);
          }
          statusCode = 200;
        }
        output.push(album);
      }
    }
    res.status(statusCode).send(output);
  } catch (error) {
    next(error);
  }
});


router.delete('/admin/:id', async(req, res, next) => {
  try{
    const album = await Album.findByPk(req.params.id) 
      await album.destroy()
      res.send(album).status(204)
  }catch(ex) {
    next(ex)
  }
})



module.exports = router;
