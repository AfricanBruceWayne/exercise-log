const express = require('express');
const router = express.Router();

// Activity Model
const Activities = require('../../models/Activity');

// @route   GET api/activities
// @desc    Get All Activities
// @access  Public
router.get('/', (req, res) => {
  Activities.find()
    .sort({ date: -1 })
    .then(activities => res.json(activities))
    .catch((err) => { res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
  });
});

// @route   POST api/activities
// @desc    Create Activity
// @access  Private
router.post('/', (req, res) => {

  let newActivity = new Activities({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date
  });

  newActivity.save()
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

// @route   DELETE api/activities/:id
// @desc    Delete Activity
// @access  Private
router.delete('/:id', (req, res) => {
  
  Activities.findByIdAndDelete(req.params.id)
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