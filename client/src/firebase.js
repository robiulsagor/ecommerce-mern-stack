import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC5Sb7886jhgCiCbMJ6P21DTcqClb_iac4",
    authDomain: "reactjs-ecomm.firebaseapp.com",
    projectId: "reactjs-ecomm",
    storageBucket: "reactjs-ecomm.appspot.com",
    messagingSenderId: "45923106920",
    appId: "1:45923106920:web:479afd78715ff7e2803bdd"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)