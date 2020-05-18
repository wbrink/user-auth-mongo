const express = require("express");

const router = express.Router();

const db = require("../model");


router.get("/api/get", (req,res) => {
  db.User.find({}, function(err, docs) {
    if (err) {
      res.status(404).json(err);
    } else {
      res.json(docs);
    }
  })
})

router.post("/api/create", (req,res) => {
  const {username, password} = req.body;
  
  db.User.create({username: username, password: password}, function(err, doc) {
    if (err) {
      console.error(err);
      res.status(404).json(err);
    } else {
      res.json(doc);
    }
  })

})

module.exports = router;