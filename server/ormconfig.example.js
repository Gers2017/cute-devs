module.exports = {
  "type": "postgres",
  "host": "localhost",
  "username": "test",
  "password": "test",
  "database": "test",
  "synchronize": true,
  "dropSchema": true, // testing purposes
  "logging": false,
  "entities": [
    "src/schema/entities/**/*.ts"
  ],
  "migrations": [
    "src/migration/**/*.ts"
  ],
  "subscribers": [
    "src/subscriber/**/*.ts"
  ]
}