const mongoose = require('mongoose');

const GlucoseTest = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  value: Number
});

const findAllGlucoseTests = async(req, res)=>{
  if (! req.user)
    res.status(400).send('Unauthorized');

  res.status(200).send(req.user.glucoseTests);
}

const readGlucoseTest = async(req, res)=>{
  if (! req.user)
    res.status(400).send('Unauthorized');

  const {date, value} = req.body
  req.user.glucoseTests.push({
    date,
    value
  });
  req.user.save((err)=>{
    if (err)
      res.status(400).send(err);

    res.status(200).send('Done');
  });
}

module.exports = {
  findAllGlucoseTests,
  readGlucoseTest,
  GlucoseTest
}
