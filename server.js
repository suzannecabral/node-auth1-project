const express = require('express');
// const helmet = require('helmet');
// const cors = require('cors');
const session = require('express-session');

//routers
const userRouter = require('./Users/userRouter');

//new server
const server = express();

const sessionConfig = {
  name:'monkey',
  secret: 'keep it secret, keep it safe',
  cookie: {
    maxAge: 1000 * 30,
    secure:false,
    httpOnly:true
  },
  resave:false,
  saveUninitialized:true, //for dev only
};


//my default logger function
//--------------------------
const logger = (req,res,next) => {
  const ts = new Date();

  console.log(`-------------------`);
  console.log(`[${ts.toLocaleTimeString()}] Server Request: `);
  console.log(`${req.method} ${req.url}`);
  console.log(`-------------------`);
  next();
}

// Middleware: Authorize
//---------------------------

  //get username and pword from req headers

  //if username and password are found
    //then find by username

      //then, if user is present 
      //and password matches bcrypt comparesync

        //authorized, continue

      //else, return 401 invalid credentials
      
      
    //if error, 500 

  //if not found, 400 no creds provided




//use middleware
//-------------------------

// server.user(helmet());
server.use(express.json());
// server.use(cors());
server.use(logger);
server.use(session(sessionConfig));


//use routers
//-------------------------
server.use('/api', userRouter);




//  default response
//---------------------------
server.get('/', (req,res)=>{
  res.status(200).json({message:`Server is running, better go catch it`})
});


module.exports = server;