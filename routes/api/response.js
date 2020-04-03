const express = require('express');
const router = express.Router();
const Leaves = require('../../models/Leaves');
const updates = require('../../models/updates'),
  User = require('../../models/User'),
  dailyUpdate = require('../../models/DailyUpdate');
auth = require('../../middleware/auth');

// ROUTE '/register/updates'
router.post('/updates', async (req, res) => {
  try {
    let current_datetime = new Date();
    let formatted_date =
      current_datetime.getDate() +
      '-' +
      (current_datetime.getMonth() + 2) +
      '-' +
      current_datetime.getFullYear();
    const newUpdate = new updates({
      total_Calls: req.body.total_Calls,
      calls_received: req.body.calls_received,
      calls_not_received: req.body.calls_not_received,
      response: req.body.response.split(','),
      user: req.body.UserID,
      date: formatted_date
    });
    //console.log(req.body);
    const aa = await updates.find({
      date: formatted_date,
      user: req.body.UserID
    });

    if (aa.length == 0) {
      const Update = await newUpdate.save();
      const user = await User.findByIdAndUpdate(
        { _id: req.body.UserID },
        { $push: { updates: Update._id } }
      );

      const USER = await user.save();
      //console.log(USER);
      const send = { message: 'Report submitted', type: 'success' };
      return res.json(send);
    } else {
      const send = {
        message: "today's report is already submitted",
        type: 'failure'
      };
      return res.json(send);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

router.post('/leaves', async (req, res) => {
  try {
    const newLeave = new Leaves({
      No_of_days: req.body.No_of_days,
      reason: req.body.reason,
      date: req.body.date,
      user: req.body.UserID
    });
    const aa = await Leaves.find({
      date: req.body.date,
      user: req.body.UserID
    });

    if (aa.length == 0) {
      const leave = await newLeave.save();
      const user = await User.findByIdAndUpdate(
        { _id: req.body.UserID },
        { $push: { leaves: newLeave._id } }
      );

      const USER = await user.save();
      const send = { message: 'leave submitted', type: 'success' };
      return res.json(send);
    } else {
      const send = { message: 'leave is already applied ', type: 'failure' };
      return res.json(send);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
router.post('/dailyUpdates', async (req, res) => {
  {
    try {
      let current_datetime = new Date();
      let formatted_date =
        current_datetime.getDate() +
        '-' +
        (current_datetime.getMonth() + 2) +
        '-' +
        current_datetime.getFullYear();

      const newDaily = new dailyUpdate({
        date: formatted_date,
        task_input: req.body.task_input,
        total_working_hour: req.body.total_working_hour,
        work_description: req.body.work_description,
        user: req.body.UserID
      });

      const aa = await dailyUpdate.find({
        date: formatted_date,
        user: req.body.UserID
      });

      if (aa.length == 0) {
        const newdaily = await newDaily.save();
        const user = await User.findByIdAndUpdate(
          { _id: req.body.UserID },
          { $push: { dailyUpdates: newDaily._id } }
        );
        const send = { message: 'Update submitted', type: 'success' };
        return res.json(send);
      } else {
        const send = { message: 'Update already submitted ', type: 'failure' };
        return res.json(send);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
});

module.exports = router;
