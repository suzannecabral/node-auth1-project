const express = require('express');
// const helmet = require('helmet');
// const cors = require('cors');

const userRouter = require('./Users/userRouter');

const server = express();

//---------------------------
//  define server middleware
//---------------------------
//my default logger function
const logger = (req,res,next) => {
  const ts = new Date();

  console.log(`-------------------`);
  console.log(`[${ts.toLocaleTimeString()}] Server Request: `);
  console.log(`${req.method} ${req.url}`);
  console.log(`-------------------`);
  next();
}

//---------------------------
//  invoke middleware
//---------------------------
// server.user(helmet());
server.use(express.json());
// server.use(cors());
server.use(logger);

server.use('/api', userRouter);

//---------------------------
//  default response
//---------------------------
server.get('/', (req,res)=>{
  res.status(200).json({message:`Server is running, better go catch it`})
});


module.exports = server;