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
