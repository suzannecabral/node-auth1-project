const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../Users/userModel');

const router = express.Router();


//endpoints



//get userlist if logged in
//---------------------------------
router.get('/users', (req,res)=>{
  Users.getAll()
    .then(data=>{
      res.status(200).json(data);
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({message: "Error getting user list"})
    });
});

//export
module.exports = router;