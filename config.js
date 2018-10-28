exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://Matthew:ingredients1@ds143953.mlab.com:43953/ingredients_users'


exports.PORT = process.env.PORT || 8080;
