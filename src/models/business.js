const db = require('../config/db');

exports.getBusinesses = (page, limit, callback) => {
  if (isNaN(page) || isNaN(limit)) {
    return callback(new Error("Page and limit must be set as numbers"));
  }
  db.query('SELECT * FROM businesses LIMIT ?, ?', [(page - 1) * limit, limit], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

  exports.getBusiness = (id, callback) => {
    db.query('SELECT * FROM businesses WHERE _id = ?', [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  };

  exports.getBusinessesByCity = (city, page, limit, callback) => {
    if (isNaN(page) || isNaN(limit)) {
      return callback(new Error("Page and limit must be set as numbers"));
    }
    db.query('SELECT * FROM businesses WHERE citySlug = ? OR address LIKE ? LIMIT ?, ?', [city, '%' + city + '%', (page - 1) * limit, limit], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  };

  exports.getBusinessesByState = (state, page, limit, callback) => {
    if (isNaN(page) || isNaN(limit)) {
      return callback(new Error("Page and limit must be set as numbers"));
    }
    db.query('SELECT * FROM businesses WHERE state = ? LIMIT ?, ?', [state,(page - 1) * limit, limit], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  };

  exports.getBusinessesByCategory = (category, page, limit, callback) => {
    if (isNaN(page) || isNaN(limit)) {
      return callback(new Error("Page and limit must be set as numbers"));
    }

    db.query('SELECT * FROM businesses WHERE categories LIKE ? LIMIT ?, ?', ['%' + category + '%', (page - 1) * limit, limit], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  };
  