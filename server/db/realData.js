const axios = require('axios');
const Album = require('./models/Album');

/*
this whole file is mad to get the seed data from discogs.com. After getting the seed data, it must be manually copy+pasted into ./albumSeed. It can be deleted if absolutely necessary, but it's probably better to leave it so we can run it again if we have to.
*/

//LEAVE THE COMMENTED PARTS OF THIS FUNCTION ALONE
//without these tests, it's very hard to track down a rate limit glitch
const getAlbumsByStyle = async (style, num = 16) => {
  let count = 0;
  try {
    const rawData = await axios.get(
      `https://api.discogs.com/database/search?q=&style=${style}&page=1&per_page=${num}&key=${process.env.DISCOGS_KEY}&secret=${process.env.DISCOGS_SECRET}`
    );
    console.log(`---search for: {genre: ${style}}, ${num} albums---`);
    // for (const header in rawData.headers) {
    //   if (header.indexOf('ratelimit') !== -1) {
    //     console.log(header, rawData.headers[header]);
    //   }
    // }
    const searchResults = rawData.data.results;
    // console.log(searchResults[0].resource_url);
    for (let i = 0; i < searchResults.length; i++) {
      const response = await axios.get(searchResults[i].resource_url, {
        //need to figure out how to authorize this request
        headers: {
          key: process.env.DISCOGS_KEY,
          secret: process.env.DISCOGS_SECRET,
        },
      });

      // console.log('detail call-------------------');
      // for (const header in response.headers) {
      //   if (header.indexOf('ratelimit') !== -1) {
      //     console.log(header, response.headers[header]);
      //   }
      // }

      const detail = response.data;
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
        count++;
      }
    }
    console.log(`~~~seeded ${count} albums in the ${style} genre~~~`);
  } catch (error) {
    if (error.response.data.message) {
      console.log(error.response.data.message, `${count} albums seeded.`);
    } else {
      console.log(error);
    }
  }
};

const styleList = [
  'Rock',
  'Pop',
  'Hip Hop',
  'Electronic',
  'Jazz',
  'Reggae',
  'Blues',
  'Latin',
  'Grunge',
  'Blues Rock',
  'House',
  'Rhythm & Blues',
  'Pop Rock',
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
  'Psychedelic Rock',
  'Arena Rock',
  'Glam',
  'Synth-pop',
  'Hard Rock',
  'Vocal',
  'Folk Rock',
  'Prog Rock',
  'AOR',
  'Country Rock',
  'Symphonic Rock',
  'Jazz-Rock',
  'Garage Rock',
  'Ballad',
  'Art Rock',
  'Indie Rock',
  'Beat',
  'Experimental',
  'Folk',
  'Mod',
  'Electric Blues',
  'Soft Rock',
  'Country',
  'Stoner Rock',
  'Interview',
  'Europop',
  'Rock & Roll',
  'Fusion',
  'Rockabilly',
  'Acid Rock',
  'Avantgarde',
  'Schlager',
  'Chanson',
  'Easy Listening',
  'Public Broadcast',
  'Modern Classical',
  'Downtempo',
  'RnB/Swing',
  'Electro',
  'Euro House',
  'Ambient',
  'Reggae-Pop',
  'Theme',
];

const slowRoll = (array, delay = 30000) => {
  console.log(
    `~~~This seed function will take ${(
      (array.length * delay) /
      1000 /
      60
    ).toFixed(1)} minutes to complete. Good luck.~~~`
  );
  for (let i = 0; i < array.length; i++) {
    setTimeout(() => {
      getAlbumsByStyle(array[i], 9);
    }, delay * i);
  }
};

//----------------use this function for testing----------
// getAlbumsByStyle('African', 9);

//-------this is the full seed method---------------------
//-------it takes a long time bc rate limiting on the api
// slowRoll(styleList);
