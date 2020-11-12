const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../Users/userModel');

const router = express.Router();


//endpoints



//get userlist if logged in
//---------------------------------

//auth uses session.user containing username, password
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


//test session data
//---------------------------------
router.get('/session', (req,res)=>{
  return res.status(200).json({session:req.session, id:req.sessionID})
});


// router.get('/session-write', (req,res)=>{
//   req.session.name = 'Chikorita';
//   return res.status(200).send('Session name saved');
// });


// router.get('/session-read', (req,res)=>{
//   const name = req.session.name;
//   res.send(`Hello ${req.session.name}`);

// });


//export
module.exports = router;