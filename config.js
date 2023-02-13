const isProduction = (process.env.NODE_ENV === 'production') ? true : false ;
const DOMAIN_NAME = 'api.blackbizapi.com';
const PORT = 80;

const SWAGGER_SETTINGS = {
    host: `${isProduction ? DOMAIN_NAME : `localhost:${PORT}`}`,
    schemes: `${isProduction ? ['https'] : ['http']}`,
};

const SWAGGER_PAGE = {customSiteTitle: 'Black Biz API Documentation'}

module.exports = {SWAGGER_SETTINGS, SWAGGER_PAGE};
