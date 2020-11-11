const db = require('../data/dbConfig');

module.exports={

  async getAll(){
    return db('users');
  },
  async getBy(username){
    return db('users')
      .where('users.username', username)
      .first();
  },

  async addNew(newUser){
    const [id] = await db('users').insert(newUser);

    return db('users')
      .where('users.id', id)
      .first();
  }

};
//middleware check for session
//if session is logged in, user can continue with call

//1. add support for sessions
//2. session updates when user logs in
//3. middleware checks if user session true
//4. user can access protected routes
  