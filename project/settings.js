module.exports.SERVER_PORT = 8000

let DB_HOST = '127.0.0.1'
let DB_PORT = 27017;
module.exports.DB_HOST = DB_HOST;
module.exports.DB_PORT = DB_PORT;
module.exports.DB_URL = `mongodb://${DB_HOST}:${DB_PORT}`
module.exports.DB_NAME = 'food';

module.exports.SESSION_KEY = '5aa607dd-5a27-41ed-89b5'
module.exports.SESSION_COLLECTION = 'sessions'
module.exports.SESSION_LENGTH = 2592000000 //ms
