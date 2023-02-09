const db = require('../config/db');

module.exports = {
  getAPIKeyByKey: (apiKey, callback) => {
    const query = 'SELECT id, user_id, api_key, request_count,  DATE_FORMAT(last_used_date, "%Y-%m-%d") AS last_used_date FROM api_keys WHERE api_key = ?';
    db.query(query, [apiKey], (error, results) => {
        if (error) return callback(error);
        if (!results || results.length === 0) return callback({error: 'Unauthorized: Invalid API key'});
        const today = new Date().toISOString().slice(0, 10);
        if (results[0].last_used_date === today) {
          if (results[0].request_count >= 2000) return callback({error: 'API limit reached for this key today'}); 
        } else {
          results[0].request_count = 0;
        }
        return callback(null, results);
    });
  }, 
  createAPIKey: (userId, apiKey, callback) => {
    const query = 'INSERT INTO api_keys (user_id, api_key, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';
    db.query(query, [userId, apiKey], (error, results) => {
      if (error) return callback(error);
      return callback(null, results);
    });
  },
  incrementRequestCount: (apiKey, callback) => {
    const query = 'UPDATE api_keys SET request_count = request_count + 1, last_used_date = ? WHERE api_key = ?';
    const today = new Date();
    db.query(query, [today, apiKey], (error, results) => {
      if (error) return callback(error);
      return callback(null, results);
    });
  }
};
