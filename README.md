# Black Biz API

The Black Biz API is a platform that provides access to a directory of black-owned businesses, making it easy for consumers to discover and support these businesses. The API uses a RESTful interface for developers to easily integrate the directory into their applications, websites, and other projects. With accurate and up-to-date information, businesses can reach a wider audience and grow their customer base. The API helps to build a more equitable and inclusive economy by connecting consumers and others with black-owned businesses. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- npm
- MySQL

### Installing

Clone the repository to your local machine

```
git clone https://github.com/Uthy/blackownedapi
```

Navigate to the project directory and install the dependencies

```
cd blackownedapi
npm install
```

Create a `.env` file in the root of the project and add the following environment variables:

```
DB_HOST=<YOUR_MYSQL_HOST>
DB_USER=<YOUR_MYSQL_USER>
DB_PASS=<YOUR_MYSQL_PASSWORD>
DB_NAME=<YOUR_MYSQL_DATABASE_NAME>
```

Start the API

```
npm start
```

## Endpoints

The API has the following endpoints:

```
GET /v1/businesses
GET /v1/businesses/:id
GET /v1/businesses/city/:city
GET /v1/businesses/state/:state
GET /v1/businesses/categories/:category
```

For response with more or less than 20 businesses. Pass in limit and/or page parameters to paginate result.

```
- GET /v1/businesses?page=<PAGE_NUMBER>&limit<COUNT>
```

For Example:
```
// Get Businesses in Los Angeles
http://localhost:8080/api/v1/businesses/city/los-angeles?page=2&limit=10
```

## Built With

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)

## Contributing

If you'd like to contribute to the development of this API, please follow these steps:

1. Fork the repository
2. Create a branch with a descriptive name for your changes (e.g. `add-new-endpoint`)
3. Commit your changes
4. Push to the branch
5. Open a pull request and assign to [@Uthy](https://github.com/Uthy/)

## Author

[@Uthy](https://github.com/Uthy/)
