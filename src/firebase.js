// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
const firebaseConfig = {
  apiKey: "AIzaSyAc7-5mUBNopXZROrh3L9iqsGPKN_JaX-4",
  authDomain: "instclone-92b19.firebaseapp.com",
  projectId: "instclone-92b19",
  storageBucket: "instclone-92b19.appspot.com",
  messagingSenderId: "361256372466",
  appId: "1:361256372466:web:7122add5fe6e781840686b",
  measurementId: "G-5B2V1K02YH"
};
// const app = initializeApp(firebaseConfig);
// console.log(app.name);
// const Storage=getStorage(app)
// export default Storage
firebase.initializeApp(firebaseConfig);
export const storage=firebase.storage()