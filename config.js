exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/Ingredients_App';

exports.PORT = process.env.PORT || 8080;