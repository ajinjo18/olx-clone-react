import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { getFirestore,query,startAt,orderBy,endAt,limit} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDEvMxwkzEyOm32M0Q30u9jcscC5HhsSWc",
    authDomain: "olx-clone-db48e.firebaseapp.com",
    projectId: "olx-clone-db48e",
    storageBucket: "olx-clone-db48e.appspot.com",
    messagingSenderId: "1010862343271",
    appId: "1:1010862343271:web:b94c5d2f4d408d7cbac0c2",
    measurementId: "G-61T981YEZM"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);



export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, firestore, updateProfile, signOut, query,startAt,orderBy,endAt,limit };
