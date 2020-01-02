const express = require('express');
const router = express();

const Exercises = require('../../models/Exercise');


// @route   GET api/exercises
// @desc    Get All Exercises
// @access  Public
router.get('/', (req, res) => {
  Exercises.find()
    .sort({ date: -1 })
    .then(exercises => res.json(exercises))
    .catch((err) => { res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });

  });
});

// @route   POST api/exercises
// @desc    Create An Exercise
// @access  Private
router.post('/', auth, (req, res) => {

  let newExercise = new Exercises({
    name: req.body.name,
    description: req.body.description,
    date: req.body.date
  });

  newExercise.save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result : {
          _id: result._id,
          title: result.title,
          description: result.description,
          date: result.date
        }
      });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.title)
        {
          res.status(400).json({ success: false, msg: err.errors.title.message });
          return;
        }
        if (err.errors.description)
        {
          res.status(400).json({ success: false, msg: err.errors.description.message });
          return;
        }
        if (err.errors.date)
        {
          res.status(400).json({ success: false, msg: err.errors.date.message });
          return;
        }
        // Show failed if all else fails for some reasons
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// @route   GET api/exercises
// @desc    Get An Exercise
// @access  Private
router.get('/:id', (req, res) => {
  Exercises.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such record.` });
    });
});

// @route   PUT api/exercises/:id
// @desc    Update An Exercise
// @access  Private
router.put('/:id', auth, (req, res) => {
  
  let updatedUser = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date
  };

  Exercises.findByIdAndUpdate({ _id: req.params.id }, updatedUser)
    .then((oldResult) => {
      Exercises.findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully added!`,
            result : {
              _id: newResult._id,
              title: newResult.title,
              description: newResult.description,
              date: newResult.date
            }
          });
        })
        .catch((err) => {
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.title)
        {
          res.status(400).json({ success: false, msg: err.errors.title.message });
          return;
        }
        if (err.errors.description)
        {
          res.status(400).json({ success: false, msg: err.errors.description.message });
          return;
        }
        if (err.errors.date)
        {
          res.status(400).json({ success: false, msg: err.errors.date.message });
          return;
        }
        // Show failed if all else fails for some reasons
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// @route   DELETE api/exercises/:id
// @desc    Delete An Exercise
// @access  Private
router.delete('/:id', auth, (req, res) => {
  
  Exercises.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully deleted`, 
        result: {
          _id: result._id,
          title: result.title,
          description: result.description,
          date: result.date
        }
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: 'Nothing to delete.' });
    });
});

module.exports = router;