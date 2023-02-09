const Business = require('../models/business');
let MAX_LIMIT = 20;

exports.getBusinesses = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || MAX_LIMIT;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;
  Business.getBusinesses(page, limit, (err, businesses) => {
    if (err) return next(err);
    res.json({ businesses });
  });
};

exports.getBusiness = (req, res, next) => {
  Business.getBusiness(req.params.id, (err, business) => {
    if (err) return next(err);
    res.json({ business });
  });
};


exports.getBusinessesByCity = (req, res, next) => {
  const city = req.params.city
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || MAX_LIMIT;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;
  Business.getBusinessesByCity(city, page, limit, (err, businesses) => {
    if (err) return next(err);
    res.json({ businesses });
  });
};


exports.getBusinessesByState = (req, res, next) => {
  const state = req.params.state
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || MAX_LIMIT;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;
  Business.getBusinessesByState(state, page, limit, (err, businesses) => {
    if (err) return next(err);
    res.json({ businesses });
  });
};


exports.getBusinessesByCategory = (req, res, next) => {
  const category = req.params.category
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || MAX_LIMIT;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;
  Business.getBusinessesByCategory(category, page, limit, (err, businesses) => {
    if (err) return next(err);
    res.json({ businesses });
  });
};