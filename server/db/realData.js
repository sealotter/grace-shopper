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
      const response = (await axios.get(searchResults[i].resource_url)).data;
      // console.log(response);
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
        rating: response.community ? response.community.rating.average : 0,
        availableInventory: response.num_for_sale,
      };
      // console.log(album);
      if (album) {
        await Album.create({ ...album });
      }
    }
    console.log(`~~~seeded ${style} genre: ${num} albums`);
  } catch (error) {
    console.log(error.response.data);
  }
};

const styleList = [
  'Pop Rock',
  'Blues Rock',
  'Hard Rock',
  'Rock & Roll',
  'Psychedelic Rock',
  'Prog Rock',
  'Folk Rock',
  'Soft Rock',
  'Country Rock',
  'Arena Rock',
  'Glam',
  'Alternative Rock',
  'Ballad',
  'Soul',
  'Art Rock',
  'Acoustic',
  'Southern Rock',
  'Synth-pop',
  'Soundtrack',
  'Disco',
  'Heavy Metal',
  'Symphonic Rock',
  'Vocal',
  'Rhythm & Blues',
  'AOR',
  'New Wave',
  'Funk',
  'Jazz-Rock',
  'Garage Rock',
  'Indie Rock',
  'Punk',
  'Beat',
  'Power Pop',
  'Experimental',
  'Folk',
  'Mod',
  'Electric Blues',
  'Chanson',
  'Country',
  'Stoner Rock',
  'Interview',
  'Europop',
  'Fusion',
  'Rockabilly',
  'Acid Rock',
  'House',
  'Avantgarde',
  'Schlager',
  'Surf',
  'Grunge',
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

const slowRoll = (array) => {
  console.log(
    `~~~This seed function will take ${array.length} minutes to complete. Good luck.~~~`
  );
  for (let i = 0; i < array.length; i++) {
    setTimeout(() => {
      // console.log(`~~~~~~${array[i]} seeded~~~~~`);
      getAlbumsByStyle(array[i]);
    }, 61001 * i);
  }
};

//----------------use this function for testing----------
getAlbumsByStyle('Punk', 10);

//----------------this is the full seed method-----------
//----------------it takes like an hour bc rate limiting on the api
// slowRoll(styleList);
