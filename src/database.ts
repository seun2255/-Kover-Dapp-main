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
import { Notification } from './types/database'

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
    canModifyKYCReviewer: false,
    kycReviewDone: false,
    kycVerificationState: 'unverified',
    insureProVerificationState: 'unverified',
    notifications: [],
    dp: 'https://gateway.lighthouse.storage/ipfs/QmeJvjHYykzkvv69QyJtBz1eY52MLungf2RVcBo2xPpMx1',
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

const updateVerificationState = async (address: any, state: string) => {
  var data: any = {}
  const userData = await getDocs(collection(db, 'users'))
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  var temp = data[address.toLowerCase()]
  temp.kycVerificationState = state
  await setDoc(doc(db, 'users', address.toLowerCase()), temp)
}

const updateDp = async (address: any, pic: string) => {
  var data: any = {}
  const userData = await getDocs(collection(db, 'users'))
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  var temp = data[address.toLowerCase()]
  temp.dp = pic
  await setDoc(doc(db, 'users', address.toLowerCase()), temp)
}

const updateInsureProVerificationState = async (
  address: any,
  state: string
) => {
  var data: any = {}
  const userData = await getDocs(collection(db, 'users'))
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  var temp = data[address.toLowerCase()]
  temp.insureProVerificationState = state
  await setDoc(doc(db, 'users', address.toLowerCase()), temp)
}

const insureProVerificationDone = async (address: any) => {
  var data: any = {}
  const userData = await getDocs(collection(db, 'users'))
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  var temp = data[address.toLowerCase()]
  temp.kycReviewDone = true
  await setDoc(doc(db, 'users', address.toLowerCase()), temp)
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

const switchKYCReviewerModify = async (address: any) => {
  var data: any = {}
  const userData = await getDocs(collection(db, 'users'))
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  var temp = data[address.toLowerCase()]
  temp.canModifyKYCReviewer = !temp.canModifyKYCReviewer
  await setDoc(doc(db, 'users', address.toLowerCase()), temp)
}

const createChatRoom = async (
  type: string,
  region: string,
  id: number,
  names: any
) => {
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
  if (data[`${type}-${region}-${id}`]) {
    console.log('chat room already created')
  } else {
    await setDoc(doc(db, 'chat-rooms', `${type}-${region}-${id}`), chatRoom)
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
      read: false,
    },
  }
  var data: any = {}
  var data2: any = {}
  const chatRoomData = await getDocs(collection(db, 'chat-rooms'))
  const userData = await getDocs(collection(db, 'users'))

  chatRoomData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })

  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data2[doc.id] = doc.data()
  })
  var temp = data[roomId]
  temp.messages.push(message)
  await setDoc(doc(db, 'chat-rooms', roomId), temp)

  const reciever = Object.keys(temp.names).find((key) => key !== sender.address)

  if (reciever) {
    var userTemp = data2[reciever.toLowerCase()]
    let notification: Notification = {
      message: {
        text: text,
        time: getCurrentTime(),
      },
      from: sender,
      link: `/chat/${roomId}`,
    }
    userTemp.notifications.push(notification)
    await setDoc(doc(db, 'users', reciever.toLowerCase()), userTemp)
  }
}

const markAllMessagesAsRead = async (roomId: string, address: any) => {
  var data: any = {}
  const chatRoomData = await getDocs(collection(db, 'chat-rooms'))

  chatRoomData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })

  var temp = data[roomId]
  temp.messages.forEach((item: any) => {
    if (item.sender.address !== address) {
      item.message.read = true
    }
  })
  await setDoc(doc(db, 'chat-rooms', roomId), temp)
}

const updateNotifications = async (address: any, newNotifications: any) => {
  var data: any = {}
  const userData = await getDocs(collection(db, 'users'))
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  var temp = data[address.toLowerCase()]
  temp.notifications = newNotifications
  await setDoc(doc(db, 'users', address.toLowerCase()), temp)
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
  if (data[address.toLowerCase()]) {
    const details = data[address.toLowerCase()]
    return details
  } else {
    return false
  }
}

export {
  // updateUserProfile,
  checkIfUserExists,
  getUserDetails,
  createUser,
  switchKYCModify,
  switchKYCReviewerModify,
  createChatRoom,
  updateTypingStatus,
  getChatRoom,
  sendMessage,
  updateVerificationState,
  updateInsureProVerificationState,
  insureProVerificationDone,
  updateNotifications,
  markAllMessagesAsRead,
  updateDp,
  db,
}
