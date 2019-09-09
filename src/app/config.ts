import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


/**
 * Api calling from local or remote server to client
 */
const host = 'http://192.168.1.83';
const port = 3000;

// const baseMediaUrl = `${host}/Aso-testing-server/server/`;
const baseMediaUrl = "https://andcowith.me/test/server/";


// const baseUrl = `${host}${port}/`;
// const baseUrl = "https://andcowith.me:3000";
// const baseUrl = "http://localhost:3000/";
// const baseMediaUrl = "http://192.168.1.83/AsoEbi-2/server/";

// const baseMediaUrl = "http://andcowith.me/test/";



// const baseUrl = `${host}${port}/`;
// const baseUrl = "http://192.168.1.83:3000/";
const baseUrl = "https://andcowith.me:3000/";


export const config = {
    baseApiUrl: baseUrl,
    baseMediaUrl: baseMediaUrl
}

/**
 * To login with yahoo mail using firebase
 */
export const firebaseConfig = {
    apiKey: "AIzaSyBpc5SskcxLBusW13gIpsKNYeKK-TlLzsw",
    authDomain: "aso-ebi-cdbf9-136fb.firebaseapp.com",
    databaseURL: "https://aso-ebi-cdbf9-136fb.firebaseio.com",
    projectId: "aso-ebi-cdbf9",
    storageBucket: "",
    messagingSenderId: "1021800185546",
    appId: "1:1021800185546:web:0b3e09d6183792d7"
};


