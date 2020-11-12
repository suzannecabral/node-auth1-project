// // const express = require('express');
// // const bcrypt = require('bcryptjs');

// module.exports = {
//   protected(req, res, next){
//     if (req.session && req.session.user) {
//       next();
//     }else{
//       res.status(401).json({message:`Valid login required`});
//     }
//   }
// }