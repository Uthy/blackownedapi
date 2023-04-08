const bcrypt = require('bcrypt');
const db = require('../config/db');


module.exports = {
  createUser: (first_name, last_name, username, password, email, callback) => {
    bcrypt.hash(password, 10, (error, hash) => {
      if (error) return callback(error);
      const query = 'INSERT INTO users (first_name, last_name, username, password, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())';
      db.query(query, [first_name, last_name, username, hash, email], (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      });
    });
  },

  getUserByUsernameOrEmail: (username, email, callback) => {
    const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.query(query, [username, email], (error, results) => {
      if (error) return callback(error);
      return callback(null, results[0]);
    })
  },  

  getUserByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (error, results) => {
      if (error) return callback(error);
      return callback(null, results[0]);
    })
  },  
  
  getAPIKeyByUserId: (userId, callback) => {
    const query = 'SELECT api_key FROM api_keys WHERE user_id = ?';
    db.query(query, [userId], (error, results) => {
      if (error) return callback(error);
      return callback(null, results[0]);
    });
  },
};

