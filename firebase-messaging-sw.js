const { initializeApp } = require('firebase-admin/app');

const firebaseConfig = require('./src/config/firebase.config')

initializeApp(firebaseConfig);