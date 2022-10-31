import { initializeApp, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, where, getDocs, getDoc, doc, query, limit } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDamYGtZI0M2TmJPVrwPSqWEaUQnn0L6ro",
    authDomain: "aws-revision.firebaseapp.com",
    projectId: "aws-revision",
    storageBucket: "aws-revision.appspot.com",
    messagingSenderId: "159784964827",
    appId: "1:159784964827:web:d308da7b31bfeb482532fe",
    measurementId: "G-H9K67R9R4D"
  };

// Initialisation can only happen once, this stop re-firing
function createFirebaseApp(config) {
    try {
      return getApp();
    } catch {
      return initializeApp(config);
    }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

// Auth exports
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

// Firestore exports
export const firestore = getFirestore(firebaseApp);

// Storage exports
export const storage = getStorage(firebaseApp);
export const STATE_CHANGED = 'state_changed';



/// Helper functions

/**`
 * Gets a users/{uid} document with username
 * @param  {string} module
 */
 export async function getModuleData(module) {

    const docRef = doc(firestore, "modules", module);
    const docSnap = await getDoc(docRef);
    // const q = query(
    //   collection(firestore, 'modules'), 
    //   where('name', '==', module),
    //   limit(1)
    // )
    // const moduleDoc = ( await getDocs(q) ).docs[0];

    if (docSnap.exists()) {
        return docSnap.data()
      } else {
        // doc.data() will be undefined in this case
        return null
      }
    // return moduleDoc;
}