require('dotenv').config();
const mysql = require('mysql');

let config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 8889
}

if (process.env.NODE_ENV === 'production') {
  console.log('Running from cloud. Connecting to DB through GCP socket.');
  config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
} else {
  console.log('Running from localhost. Connecting to DB directly.');
  config.host = process.env.LHOST
  config.user = process.env.LUSER
  config.password = process.env.LPASSWORD
  config.database = process.env.LDATABASE
}

const connection = mysql.createConnection(config);


module.exports = connection;
