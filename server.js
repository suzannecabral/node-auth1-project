const express = require('express');
const session = require('express-session');

//routers
const userRouter = require('./Users/userRouter');
const authRouter = require('./auth/authRouter');

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

//middleware check for session
//if session is logged in, user can continue with call

//[x] 1. add support for sessions
//[ ] 2. session updates when user logs in
//[ ] 3. middleware checks if user session true
//[ ] 4. user can access protected routes
  
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
server.use(express.json());
server.use(logger);
server.use(session(sessionConfig));


//use routers
//-------------------------
server.use('/api', userRouter);
server.use('/api/auth', authRouter)



//  default response
//---------------------------
server.get('/', (req,res)=>{
  res.status(200).json({message:`Server is running, better go catch it`})
});


module.exports = server;