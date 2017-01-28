const mongoose = require('./mongoose');
var Movement = require('./models/Movement');

function ensureMovement(movement) {
    return Movement.find(movement).exec().then(result => {
        if (result.length > 0) {
            console.log('Updating', movement);
            return Movement.update(result).exec();
        } else {
            console.log('Creating', movement);
            return Movement.create(movement);
        }
    });
}

function seedMovements() {
    var movements = [
        { name: 'Low Bar Back Squat' },
        { name: 'High Bar Back Squat' },
        { name: 'Front Squat' },
        { name: 'Bench Press' },
        { name: 'Overhead Press' },
        { name: 'Deadlift' },
        { name: 'Power Clean' },
        { name: 'Pull Up' },
        { name: 'Chin Up' }
    ].map(a => ensureMovement(a));

    return Promise.all(movements);
}

seedMovements().then(movements => {
    console.log('created movements: ', movements);
}).catch(err => {
    console.error('error creating movements: ', err)    
}).then(() => mongoose.connection.close());

if (process.env.NODE_ENV === 'development') {
  // seed sample data
}

console.log('done');