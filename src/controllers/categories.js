const Category = require('../models/category');

exports.getCategories = (req, res, next) => {
    Category.getCategories((err, categories) => {
      if (err) return next(err);
      res.json({ categories });
    });
  };