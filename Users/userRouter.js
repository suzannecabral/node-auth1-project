const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('./userModel');
const server = require('../server');

const router = express.Router();


//endpoints

//default
//--------------------------------
router.get('/', (req,res)=>{
  res.status(200).json("Router is working");
});




//post new user
//--------------------------------
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



//login user
//--------------------------------

router.post('/login', (req,res)=>{

  const {username, password} = req.body;
  
  Users.getBy(username)
    .then(user =>{
      if(user && bcrypt.compareSync(password, user.password)){
        req.session.user = user;
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


//logout user
//--------------------------------

router.get('/logout', (req,res)=>{
  if(req.session){
    req.session.destroy(err =>{
      if(err){
        res.status(500).json({message:'Error logging out'});
      }else{
        res.status(200).json({message:'Goodbye!'});
      }
    });
  }
})




//export
module.exports = router;