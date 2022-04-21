'use strict';

const {
  db,
  models: { User, Album, Cart, LineItem }, 
} = require('../server/db');
const testData = require('../server/db/testData');
const realData = require('../server/db/realData');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  try {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const [codyP, murphyM, janaeE, lisaK, annaK, ericR, cart1, cart2, cart3, cart4, cart5, cart6] = await Promise.all([
    User.create({ username: 'cody', password: '123', firstName: 'Cody', lastName: 'Perez', email: 'perez.cody@gmail.com', address: '3095 Ridenour Street, San Francisco, CA 33323'}),
    User.create({ username: 'murphy', password: '123', firstName: 'Murphy', lastName: 'Miller', email: 'miller.murphy@gmail.com', address: '434 Stroop Hill Road, Atlanta, GA 30310'}),
    User.create({ username: 'janae', password: '123', firstName: 'Janae', lastName: 'Edwards', email: 'edwards.janae@gmail.com', address: '46 Hollis Lane Willingboro, NJ 08046'}),
    User.create({ username: 'lisa', password: '123', firstName: 'Lisa', lastName: 'Knox', email: 'knox.lisa@gmail.com', address: '4088 Elk Creek Road Duluth, GA 30136'}),
    User.create({ username: 'anna', password: '123', firstName: 'Anna', lastName: 'Kohler', email: 'kohler.anna@gmail.com', address: '4095 Hilltop Street Bernardstown, MA 01337'}),
    User.create({ username: 'eric', password: '123', firstName: 'Eric', lastName: 'Rodgers', email: 'rodgers.eric@gmail.com', address: '2210 Petunia Way, Birmingham, AL 35209'}),
    Cart.create({ isPurchased: true }),
    Cart.create({ isPurchased: true }),
    Cart.create({ isPurchased: false }),
    Cart.create({ isPurchased: false }),
    Cart.create({ isPurchased: false }),
    Cart.create({ isPurchased: false }),
    ]);

    cart1.userId = janaeE.id; // 3
    cart2.userId = codyP.id; //  1
    cart3.userId = murphyM.id; // 5
    cart4.userId = lisaK.id; // 4
    cart5.userId = annaK.id; // 2
    cart6.userId = ericR.id; // 6

    await Promise.all([
      cart1.save(),
      cart2.save(),
      cart3.save(),
      cart4.save(),
      cart5.save(),
      cart6.save()
    ]);

  const albums = await Album.bulkCreate(testData);




  //console.log(`seeded ${users.length} users`);
  console.log(`seeded ${albums.length} albums`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: User[0],
      murphy: User[1],
    },
  };
}
catch(ex){
  console.log(ex)
} 
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
