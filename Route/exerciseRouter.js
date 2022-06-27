const exerciseRoute = require('express').Router();
const Exercise = require('../Model/exerciseSchema');
const { validate, login } = require('../middleware');



//////////// INDEX ROUTE (get all the list of exercise) //SUCCESS //WORKS!!!!/////////////////////////
exerciseRoute.get('/', validate, (req, res) => {
    Exercise.find({
      name: req.name
    }, (error, exercises) => {
      if (error) {
        console.error(error);
        res.status(404).json({
          error: error
        });
      } else {
        res.status(200).json({
          exerciseList:exercises
        });
      }
    });
  });







///////////////////////////////////// ROUTE TO CREATE AND ADD TO EXERCISE.  /// SUCCESS WORKS!!!!////////////////////////////////////////

exerciseRoute.post("/add",validate,(req, res) => {
  const name = req.name;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  

  const newExercise = new Exercise({
    name,
   description,
    duration,
    date,
  });
console.log(newExercise)
  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

exerciseRoute.get('/:id', (req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});


////////////// ROUTE TO DELETE AN EXERCISE  // SUCESS ///WORKS!!!!! ///////////////////////////////////////

exerciseRoute.delete('/:id',(req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////

//////ROUTE TO UPDATE AN EXERCISE WITH SPECIFIC ID // SUCCESS WORKS!!!! 
exerciseRoute.post('/update/:id',(req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.name= req.body.name;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = exerciseRoute;