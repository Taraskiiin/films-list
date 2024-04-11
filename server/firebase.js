import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config.js";

const firebase = initializeApp(firebaseConfig);

export default firebase;
