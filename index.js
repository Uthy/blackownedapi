require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const businessRoutes = require('./src/routes/businesses');
const categoryRoutes = require('./src/routes/categories');
const signup =  require('./src/routes/signup');
const login =  require('./src/routes/login');
const middleware = require('./src/middleware/index')
const apiCheck = middleware.validateAPI;
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const {SWAGGER_SETTINGS, SWAGGER_PAGE} = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.options('*', cors());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With', 'X-CSRF-Token', 'x-api-key'],
}));

app.use("/v1/", apiCheck);
app.use('/v1/', businessRoutes);
app.use('/v1/', categoryRoutes);
app.use('/', signup);
app.use('/', login);


const json = fs.readFileSync('swagger.json', 'utf-8');
const parsed = JSON.parse(json);
parsed.host = SWAGGER_SETTINGS.host;
parsed.schemes = SWAGGER_SETTINGS.schemes;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(parsed, SWAGGER_PAGE));

app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
      message: err.message,
      error: err
    });
});


const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () =>console.log(`Server running on Port: ${PORT}`) )