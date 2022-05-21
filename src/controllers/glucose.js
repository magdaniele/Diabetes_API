const findAllGlucoseTests = async(req, res)=>{
  if (req.user)
    res.status(200).send(req.user.glucoseTests);
  else
    res.status(401).send('Unauthorized');
}

const readGlucoseTest = async(req, res)=>{
  if (req.user) {
    const {date, value} = req.body
    req.user.glucoseTests.push({
      date,
      value
    });
    req.user.save()
      .then((doc)=> {
        res.status(200).send(doc);
      })
      .catch((err)=> {
        res.status(400).send(err);
      });
  } else
    res.status(401).send('Unauthorized');
}

module.exports = {
  findAllGlucoseTests,
  readGlucoseTest
}
