const User = require('./user');
const Exercise = require('./exercise');
const Sets = require('./sets');
// const Workout = require('./workout');

// User-Set association
// Creating the workout association table
User.belongsToMany(Sets, { through: 'workout' });
Sets.belongsTo(User, { through: 'workout' });

// Set to exercise association
Sets.belongsTo(Exercise);
Exercise.hasMany(Sets, { as: 'Sets' });

module.exports = { User, Exercise, Sets };
