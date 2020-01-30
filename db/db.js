const Sequelize = require('sequelize');
const pkg = require('../package.json');

// const databaseName = pkg.name + process.env.NODE_ENV === 'test' ? '-test' : '';
const databaseName = 'workout-app';

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  { dialect: 'postgres', logging: false }
);
// console.log('HELLOOOOOOOOOOOOOO', '.' + pkg.name + '.');
// console.log('2HELLOOOOOOOOOOOOOO2', '.' + process.env.NODE_ENV + '.');
// console.log('HI IS IT WORKINNG?', databaseName === pkg.name);
module.exports = db;

// global mocha hook to close connection

if (process.env.NODE_ENV === 'test') {
  after('closed connection', () => db.close());
}
