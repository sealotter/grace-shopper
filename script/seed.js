"use strict";

const albumSeed = require("../server/db/albumSeed");

const {
  db,
  models: { User, Album, Cart, LineItem },

} = require('../server/db');
// const testData = require('../server/db/testData');
const realData = require('../server/db/realData');


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  try {
    await db.sync({ force: true }); // clears db and matches models to tables

    console.log('db synced!');


    // Create Users

    const users = [
      {

        username: 'cody',
        password: '123',
        firstName: 'Cody',
        lastName: 'Perez',
        email: 'perez.cody@gmail.com',
        address: '3095 Ridenour Street, San Francisco, CA 33323',
      },
      {
        username: 'murphy',
        password: '123',
        firstName: 'Murphy',
        lastName: 'Miller',
        email: 'miller.murphy@gmail.com',
        address: '434 Stroop Hill Road, Atlanta, GA 30310',
      },
      {
        username: 'janae',
        password: '123',
        firstName: 'Janae',
        lastName: 'Edwards',
        email: 'edwards.janae@gmail.com',
        address: '46 Hollis Lane Willingboro, NJ 08046',
      },
      {
        username: 'lisa',
        password: '123',
        firstName: 'Lisa',
        lastName: 'Knox',
        email: 'knox.lisa@gmail.com',
        address: '4088 Elk Creek Road Duluth, GA 30136',
      },
      {
        username: 'anna',
        password: '123',
        firstName: 'Anna',
        lastName: 'Kohler',
        email: 'kohler.anna@gmail.com',
        address: '4095 Hilltop Street Bernardstown, MA 01337',
      },
      {
        username: 'eric',
        password: '123',
        firstName: 'Eric',
        lastName: 'Rodgers',
        email: 'rodgers.eric@gmail.com',
        address: '2210 Petunia Way, Birmingham, AL 35209',

      },
    ];
    const [codyP, murphyM, janaeE, lisaK, annaK, ericR] = await Promise.all(
      users.map((user) =>
        User.create({
          username: user.username,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          address: user.address,
        })
      )
    );

    // Create Carts

    const carts = await Promise.all([
      Cart.create({ userId: codyP.id, isPurchased: false }),
      Cart.create({ userId: murphyM.id, isPurchased: false }),
      Cart.create({ userId: janaeE.id, isPurchased: false }),
      Cart.create({ userId: lisaK.id, isPurchased: false }),
      Cart.create({ userId: annaK.id, isPurchased: false }),
      Cart.create({ userId: ericR.id, isPurchased: false }),
    ]);

    // Create LineItems: How to add albumIds here?

    const lineItems = await Promise.all([
      LineItem.create({ cartId: 1, quantity: 1 }),
      LineItem.create({ cartId: 1, quantity: 1 }),
      LineItem.create({ cartId: 2, quantity: 2 }),
      LineItem.create({ cartId: 2, quantity: 2 }),
      LineItem.create({ cartId: 3, quantity: 2 }),
      LineItem.create({ cartId: 4, quantity: 2 }),
      LineItem.create({ cartId: 5, quantity: 2 }),
      LineItem.create({ cartId: 6, quantity: 2 }),
    ]);

    // Create Albums


    const albums = await Album.bulkCreate(realData);


    try {
      await Album.bulkCreate(albumSeed);
    } catch (error) {
      console.log(error.errors);
    }


    console.log(`seeded ${users.length} users`);
    console.log(`seeded ${albumSeed.length} albums`);

    console.log(`seeded successfully`);

    return {
      users: {
        cody: User[0],
        murphy: User[1],
      },
    };
  } catch (ex) {
    console.log(ex);
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
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
