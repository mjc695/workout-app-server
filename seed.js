const db = require('./server/db/db');
const { green, red } = require('chalk');

const { User, Exercise, Sets } = require('./server/db/models');

const users =
{
  email: 'monmon@email.com',
  password: '123',
  firstName: 'Monferd',
  lastName: 'Collin',
}
  ;

const exercises = [
  {
    name: 'Deadlift',
    type: 'compound',
    description: 'pick things up and put them down',
  },
  {
    name: 'Squat',
    type: 'compound',
    description: 'makes you look like you are pooping',
  },
  {
    name: 'Bench Press',
    type: 'compound',
    description: 'chest day is every day',
  },
];

const aSet = [
  {
    userId: 1,
    exerciseId: 1,
    weight: 100,
    weightUnit: 'lbs',
    repetitions: 12,
  },
];

const workout = [
  {
    userId: 1,
    setId: 1,
  },
];

const seed = async () => {
  await db.sync({ force: true });
  await User.create(users);
  await Exercise.bulkCreate(exercises);
  await Sets.bulkCreate(aSet);
  // await workout.bulkCreate(workout);

  console.log(green('seeding Successfully completed!'));
  await db.close();
};
// db.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
// seed().catch(err => {
//   console.log(red('Oh no something went wrong :('));
//   console.error(err);
//   db.close();
// });
async function runseed() {
  console.log('seeding...')
  try {
    await seed()
    console.log('seeded one user')
  } catch (err) {
    console.error(err)
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

runseed()
