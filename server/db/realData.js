const axios = require('axios');
const Album = require('./models/Album');

const getAlbumsByStyle = async (style, num = 16) => {
  try {
    const rawData = await axios.get(
      `https://api.discogs.com/database/search?q=&style=${style}&page=1&per_page=${num}&key=${process.env.DISCOGS_KEY}&secret=${process.env.DISCOGS_SECRET}`
    );
    const searchResults = rawData.data.results;
    // console.log(searchResults[0]);
    for (let i = 0; i < searchResults.length; i++) {
      const response = await axios.get(searchResults[i].resource_url, {
        //need to figure out how to authorize this request
        headers: {
          key: process.env.DISCOGS_KEY,
          secret: process.env.DISCOGS_SECRET,
        },
      });
      const detail = response.data;
      // console.log(detail);
      const album = {
        // format: detail.formats[0].name,
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
      }
    }
    console.log(`~~~seeded ${num} albums in the ${style} genre~~~`);
  } catch (error) {
    console.log(error.response.data);
  }
};

const styleList = [
  // 'Rock',
  // 'Pop',
  // 'Hip Hop',
  // 'Electronic',
  // 'Jazz',
  'Reggae',
  'Blues',
  'Latin',
  'Pop Rock',
  'Blues Rock',
  'House',
  'Rhythm & Blues',
  'Psychedelic Rock',
  'Grunge',
  'New Wave',
  'Punk',
  'Alternative Rock',
  'Funk',
  'Soul',
  'Acoustic',
  'Southern Rock',
  'Soundtrack',
  'Disco',
  'Heavy Metal',
  'Surf',
  // 'Arena Rock',
  // 'Glam',
  // 'Synth-pop',
  // 'Hard Rock',
  // 'Vocal',
  // 'Folk Rock',
  // 'Prog Rock',
  // 'AOR',
  // 'Country Rock',
  // 'Symphonic Rock',
  // 'Jazz-Rock',
  // 'Garage Rock',
  // 'Ballad',
  // 'Art Rock',
  // 'Indie Rock',
  // 'Beat',
  // 'Experimental',
  // 'Folk',
  // 'Mod',
  // 'Electric Blues',
  // 'Soft Rock',
  // 'Country',
  // 'Stoner Rock',
  // 'Interview',
  // 'Europop',
  // 'Rock & Roll',
  // 'Fusion',
  // 'Rockabilly',
  // 'Acid Rock',
  // 'Avantgarde',
  // 'Schlager',
  // 'Chanson',
  // 'Easy Listening',
  // 'Public Broadcast',
  // 'Modern Classical',
  // 'Downtempo',
  // 'RnB/Swing',
  // 'Electro',
  // 'Euro House',
  // 'Ambient',
  // 'Reggae-Pop',
  // 'Theme',
];

const slowRoll = (array, delay = 61000) => {
  console.log(
    `~~~This seed function will take ~${
      array.length * Math.floor(delay / 60000)
    } minutes to complete. Good luck.~~~`
  );
  for (let i = 0; i < array.length; i++) {
    setTimeout(() => {
      getAlbumsByStyle(array[i]);
    }, delay * i);
  }
};

//----------------use this function for testing----------
getAlbumsByStyle('Hip Hop', 10);
// getAlbumsByStyle('Rock', 5);
getAlbumsByStyle('Pop', 5);

//----------------this is the full seed method-----------
//-------it takes like an hour bc rate limiting on the api
// slowRoll(styleList);
