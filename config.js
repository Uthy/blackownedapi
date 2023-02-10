const isProduction = (process.env.NODE_ENV === 'production') ? true : false ;
const DOMAIN_NAME = 'blackbizapi.com';
const PORT = 80;

const SWAGGER_SETTINGS = {
    host: `${isProduction ? DOMAIN_NAME : `localhost:${PORT}`}`,
    schemes: `${isProduction ? ['https'] : ['http']}`,
};

module.exports = SWAGGER_SETTINGS;