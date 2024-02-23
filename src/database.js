import app from '@/firebase/firebaseApp'
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from 'firebase/firestore'
import { timeStamp } from './utils/dateFunctions'

const db = getFirestore(app)

/**
 * Auth Functions
 */

//Checks if the User exists in the database
const checkIfUserExists = async (user) => {
  var data = {}
  const userData = await getDocs(collection(db, 'users'))
  userData.forEach((doc) => {
    data[doc.id] = doc.data()
  })
  var state = false
  const addresses = Object.keys(data)
  addresses.map((address) => {
    if (address === user.toLowerCase()) state = true
  })
  return state
}

//creates a new User
const createUser = async (address, name) => {
  const user = {
    name: name,
    profilePic: '',
    address: address.toLowerCase(),
    canModifyKYC: false,
  }
  var data = {}
  const userData = await getDocs(collection(db, 'users'))
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  if (data[address.toLowerCase()]) {
    console.log('User already registered')
  } else {
    await setDoc(doc(db, 'users', address.toLowerCase()), user)
  }
}

const switchKYCModify = async (address) => {
  var data = {}
  const userData = await getDocs(collection(db, 'users'))
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  var temp = data[address.toLowerCase()]
  temp.canModifyKYC = !temp.canModifyKYC
  await setDoc(doc(db, 'users', address.toLowerCase()), temp)
}

//updates a users data
// const updateUserProfile = async (
//   name,
//   profilePic,
//   address
// ) => {
//   var data = {};
//   const userData = await getDocs(collection(db, "users"));
//   userData.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     data[doc.id] = doc.data();
//   });
//   var temp = data[address.toLowerCase()];
//   console.log(temp);
//   temp.about = about;
//   temp.username = username;
//   temp.profilePic = profilePic;
//   await setDoc(doc(db, "users", address.toLowerCase()), temp);
// };

//gets a users data
const getUserDetails = async (address) => {
  var data = {}
  const userData = await getDocs(collection(db, 'users'))
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  const details = data[address.toLowerCase()]
  return details
}

export {
  // updateUserProfile,
  checkIfUserExists,
  getUserDetails,
  createUser,
  switchKYCModify,
}
