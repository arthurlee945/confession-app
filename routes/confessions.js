const mongoose = require('mongoose');
const router = require('express').Router();
const Schema = mongoose.Schema;

const confessionSchema = new Schema({
  confession: {
    type:String,
    required:true,
    trim: true,
    minlength:4
  }
})


const Confessions = mongoose.model("Confessions", confessionSchema);


router.get("/", (req, res) => {
  Confessions.find()
  .then(confess => res.json(confess))
  .then(data => console.log(data))
  .catch(err => res.status(400).json(" Error: " + err))
})

router.post("/add", (req, res) => {
  const confession = req.body.confession;
  const newConfession = new Confessions({confession})

  newConfession.save()
  .then(()=>{res.json("confessed")})
})

module.exports = router;