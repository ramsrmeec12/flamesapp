import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

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

export async function saveToFirebase(name1, name2) {
  await addDoc(collection(db, 'submissions'), {
    yourName: name1,
    crushName: name2,
    timestamp: Date.now()
  });
}

export async function getSubmissions() {
  const snapshot = await getDocs(collection(db, 'submissions'));
  return snapshot.docs.map(doc => doc.data());
}
