// utils/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHyRKFOAiPZdQ4UJBGI2Dkz5w_KpI5cjc",
  authDomain: "flamesapp-c7624.firebaseapp.com",
  projectId: "flamesapp-c7624",
  storageBucket: "flamesapp-c7624.firebasestorage.app",
  messagingSenderId: "574780869386",
  appId: "1:574780869386:web:61b479bd1d1214b86408f3",
  measurementId: "G-YHQ979HV0X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveToFirebase = async (yourName, crushName) => {
  await addDoc(collection(db, "flames"), {
    yourName,
    crushName,
    timestamp: serverTimestamp()
  });
};

export const getSubmissions = async () => {
  const snapshot = await getDocs(collection(db, "flames"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deleteSubmission = async (id) => {
  await deleteDoc(doc(db, "flames", id));
};
