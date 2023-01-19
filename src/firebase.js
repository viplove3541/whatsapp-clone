import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAKNizOe-JMW_qX6myLvf4v5ZOhau2t8ow",
  authDomain: "whatsapp-clone-52df4.firebaseapp.com",
  projectId: "whatsapp-clone-52df4",
  storageBucket: "whatsapp-clone-52df4.appspot.com",
  messagingSenderId: "494515526277",
  appId: "1:494515526277:web:a73d2829e3192d9d22e7ec"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  // Use these for db & auth
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  
  export {auth, provider};
  export default db;