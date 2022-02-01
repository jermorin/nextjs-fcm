const admin = require("firebase-admin");
const serviceAccount = require("../../poc-firebase.json");

const adminInit = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app()

export default adminInit