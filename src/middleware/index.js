require('dotenv').config();
const apiKeysModel = require('../models/apiKeys');
var nodemailer = require('nodemailer');

const EMAIL_HOST = process.env.EMAIL_HOST;
const SEND_EMAIL = process.env.SEND_EMAIL;
const SEND_PWD = process.env.SEND_PWD;

module.exports = {
  validateAPI: (req, res, next) => {
    try {
      const providedApiKey = req.headers['x-api-key'];
      if (!providedApiKey) return res.status(401).json({ error: 'Unauthorized: No API key provided' });

      apiKeysModel.getAPIKeyByKey(providedApiKey, (error, apiKeyResults) => {
        if (error) return res.send(error);
        
        apiKeysModel.incrementRequestCount(providedApiKey, (error) => {
          if (error) return res.status(500).json({ error });
          next();
        });
      });
    } catch (error) {
      res.status(400)
      return res.send(error)
    }
  },

  transporter: nodemailer.createTransport({
    host: EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: SEND_EMAIL,
        pass: SEND_PWD
    }
  }),
};
