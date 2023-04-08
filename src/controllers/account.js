require('dotenv').config();
const userModel = require('../models/user');
const apiKeysModel = require('../models/apiKeys');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const middleware = require('../middleware/index');
var nodemailer = require('nodemailer');
const transporter = middleware.transporter;
const SEND_EMAIL = process.env.EMAIL;


module.exports = {
  signup: (req, res) => {
    try {
      const { first_name, last_name, username, password, email} = req.body;
      userModel.getUserByUsernameOrEmail(username, email, (error, existingUser) => {
        if (error) return res.status(500).json({ error });
        if (existingUser) return res.status(400).json({ error: 'Username or email already exists' });

          const key = generateAPIKey();
          userModel.createUser(first_name, last_name, username, password, email, (error, userResults) => {
            var mailOptions = {
              from: SEND_EMAIL,
              to: email,
              subject: 'Your BlackBizAPI Key',
              html: `<p>Hello, ${first_name}</p><br/>
                    <p>Your BlackBizAPI Key: <br/> <b>${key}</b></p>`
            };

            if (error) return res.status(500).json({ error });
            apiKeysModel.createAPIKey(userResults.insertId, key, (error, apiKeyResults) => {
              if (error) return res.status(500).json({ error });
              return res.json({ message: 'User and API key created successfully', apiKey: key});
            });

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });

          });
      })
    } catch (error) {
      res.status(400)
      return res.send(error)
    }
  },

  login: (req, res) => {
    try {
      const { password, username } = req.body;
      userModel.getUserByEmail(username, (error, user) => {
        if (error) return res.status(500).json({ error });
        if (!user) return res.status(400).json({ error: 'Username or password is incorrect' });
        bcrypt.compare(password, user.password, (error, result) => {
          if (error) return res.status(500).json({ error });
          if (!result) return res.status(400).json({ error: 'Username or password is incorrect' });
          const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });

          userModel.getAPIKeyByUserId(user.id, (error, apiKey) => {
            if (error) return res.status(500).json({ error });
            return res.json({ message: 'Login successful', token, apiKey });
          });
        });
      });
    } catch (error) {
      res.status(400)
      return res.send(error)
    }
  },
};

function generateAPIKey() {
    const apiKey = crypto.randomBytes(32).toString('hex');
    return apiKey.slice(0, 8) + '-' + apiKey.slice(8, 12) + '-' + apiKey.slice(12, 16) + '-' + apiKey.slice(16, 32);
}

