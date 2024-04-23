


import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAEfNoBtOQ2eYQVgr5jDcNRm0T6lPHqFiY",
  authDomain: "elivator-3c9ef.firebaseapp.com",
  databaseURL: "https://elivator-3c9ef-default-rtdb.firebaseio.com",
  projectId: "elivator-3c9ef",
  storageBucket: "elivator-3c9ef.appspot.com",
  messagingSenderId: "110541792751",
  appId: "1:110541792751:web:8d780ba40db1da1dbd821a",
  measurementId: "G-J8YYT2DZHM"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export { firebaseApp, database };
