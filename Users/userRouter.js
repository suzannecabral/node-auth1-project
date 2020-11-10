const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('./userModel');
const { getAll } = require('./userModel');

const router = express.Router();


//endpoints

//default
router.get('/', (req,res)=>{
  res.status(200).json("Router is working");
});

//get userlist if logged in
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


//--------------------------------
//post new user
router.post('/register', (req,res)=>{
  const newUser = req.body;

  const hash = bcrypt.hashSync(newUser.password,12);
  //sync means rest will not execute until after the hash is done
  newUser.password = hash;
  
  Users.addNew(newUser)
    .then(data =>{
      res.status(201).json(data);
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({message: "Error creating user"})
    });
});

//--------------------------------
//login user
router.post('/login', (req,res)=>{

  const {username, password} = req.body;
  
  Users.getBy(username)
    .then(user =>{
      if(user && bcrypt.compareSync(password, user.password)){
        res.status(200).json({message: `Welcome ${user.username}!`});
      }else{
        res.status(401).json({message:`Invalid credentials`});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(200).json({message:"Error getting user"})
    });

});

//export
module.exports = router;