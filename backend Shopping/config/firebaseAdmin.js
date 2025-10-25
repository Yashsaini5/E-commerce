const admin =  require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config();

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;