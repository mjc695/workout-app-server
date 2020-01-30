const db = require('./db/db');
const { green, red } = require('chalk');

const { User, Exercise, Sets } = require('./db/models');

const users = [
  {
    firstName: 'Monferd',
    lastName: 'Collin',
    email: 'monmon@email.com',
    password: 123,
  },
];

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

  await User.bulkCreate(users);
  await Exercise.bulkCreate(exercises);
  await Sets.bulkCreate(aSet);
  // await workout.bulkCreate(workout);

  console.log(green('seeding Successfully completed!'));
  await db.close();
};
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
seed().catch(err => {
  console.log(red('Oh no something went wrong :('));
  console.error(err);
  db.close();
});
