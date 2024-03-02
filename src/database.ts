import app from './firebaseConfig/firebaseApp'
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from 'firebase/firestore'
import { getCurrentTime } from './utils/dateTime'
// import { timeStamp } from './utils/dateFunctions'

const db = getFirestore(app)

/**
 * Auth Functions
 */

//Checks if the User exists in the database
const checkIfUserExists = async (user: any) => {
  var data: any = {}
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
const createUser = async (address: any) => {
  const user = {
    canModifyKYC: false,
  }
  var data: any = {}
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

const switchKYCModify = async (address: any) => {
  var data: any = {}
  const userData = await getDocs(collection(db, 'users'))
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  var temp = data[address.toLowerCase()]
  temp.canModifyKYC = !temp.canModifyKYC
  await setDoc(doc(db, 'users', address.toLowerCase()), temp)
}

const createChatRoom = async (type: string, id: number, names: any) => {
  const chatRoom = {
    messages: [],
    // typingStatus: {
    //   [user]: false,
    //   [admin]: false,
    // },
    names: names,
  }
  var data: any = {}
  const chatRoomData = await getDocs(collection(db, 'chat-rooms'))
  chatRoomData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  if (data[`${type}-${id}`]) {
    console.log('chat room already created')
  } else {
    await setDoc(doc(db, 'chat-rooms', `${type}-${id}`), chatRoom)
  }
}

const updateTypingStatus = async (
  address: string,
  roomId: string,
  state: boolean
) => {
  var data: any = {}
  const chatRoomData = await getDocs(collection(db, 'chat-rooms'))
  chatRoomData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  var temp = data[roomId]
  temp.typingStatus[address] = state
  await setDoc(doc(db, 'chat-rooms', roomId), temp)
}

const sendMessage = async (roomId: string, sender: any, text: string) => {
  const message = {
    sender: sender,
    message: {
      text: text,
      time: getCurrentTime(),
    },
  }
  console.log(message)
  var data: any = {}
  const chatRoomData = await getDocs(collection(db, 'chat-rooms'))
  chatRoomData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  var temp = data[roomId]
  temp.messages.push(message)
  await setDoc(doc(db, 'chat-rooms', roomId), temp)
}

const getChatRoom = async (roomId: string) => {
  var data: any = {}
  const chatRoomData = await getDocs(collection(db, 'chat-rooms'))
  chatRoomData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  var details = data[roomId]
  return details
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
const getUserDetails = async (address: any) => {
  var data: any = {}
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
  createChatRoom,
  updateTypingStatus,
  getChatRoom,
  sendMessage,
  db,
}
