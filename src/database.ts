import app from './firebaseConfig/firebaseApp'
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from 'firebase/firestore'
import { getCurrentTime, getCurrentFormattedTime } from './utils/dateTime'
// import { timeStamp } from './utils/dateFunctions'
import { Notification } from './types/database'

const db = getFirestore(app)

interface CoverDetails {
  status: string
  poolName: string
  id: string
  canModify: false
}

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
    dp: 'default',
    covers: [],
    isExpert: false,
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

// Cover
const addCover = async (address: any, cover: any) => {
  var data: any = {}
  const userData = await getDocs(collection(db, 'users'))
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  var temp = data[address.toLowerCase()]
  temp.covers.push(cover)
  await setDoc(doc(db, 'users', address.toLowerCase()), temp)
}

const updateCoverQuote = async (
  address: any,
  poolName: string,
  newValues: any
) => {
  var data: any = {}
  const userData = await getDocs(collection(db, 'users'))
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  var temp = data[address.toLowerCase()]
  const newCovers = temp.covers.map((cover: any) => {
    if (cover.poolName === poolName) {
      cover.premiumQuote = newValues.premiumQuote
      cover.src = newValues.src
      cover.deductiblePerc = newValues.deductiblePerc
      cover.maxExposure = newValues.maxExposure
      cover.riskFactor = newValues.riskFactor
    }
    return cover
  })
  temp.covers = newCovers
  await setDoc(doc(db, 'users', address.toLowerCase()), temp)
}

const switchCoverModifyState = async (address: any, poolName: string) => {
  var data: any = {}
  const userData = await getDocs(collection(db, 'users'))
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  var temp = data[address.toLowerCase()]
  const newCovers = temp.covers.map((cover: any) => {
    if (cover.poolName === poolName) {
      cover.canModify = !cover.canModify
    }
    return cover
  })
  temp.covers = newCovers
  await setDoc(doc(db, 'users', address.toLowerCase()), temp)
}

const updateCoverState = async (
  address: any,
  poolName: string,
  accepted: boolean
) => {
  var data: any = {}
  const userData = await getDocs(collection(db, 'users'))
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  var temp = data[address.toLowerCase()]
  const newCovers = temp.covers.map((cover: any) => {
    if (cover.poolName === poolName) {
      if (accepted) {
        cover.status = 'accepted'
      } else {
        cover.status = 'rejected'
      }
    }
    return cover
  })
  temp.covers = newCovers
  await setDoc(doc(db, 'users', address.toLowerCase()), temp)
}

const updateCoverClaimState = async (
  address: any,
  poolName: string,
  claimState: string
) => {
  var data: any = {}
  const userData = await getDocs(collection(db, 'users'))
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  var temp = data[address.toLowerCase()]
  const newCovers = temp.covers.map((cover: any) => {
    if (cover.poolName === poolName) {
      cover.claimState = claimState
      cover.claimHistory += 1
    }
    return cover
  })
  temp.covers = newCovers
  await setDoc(doc(db, 'users', address.toLowerCase()), temp)
}

const getCoverDetails = async (address: any, poolName: string) => {
  var data: any = {}
  var coverDetails: any = {}
  const userData = await getDocs(collection(db, 'users'))
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  const details = data[address.toLowerCase()]
  details.covers.map((cover: any) => {
    if (cover.poolName === poolName) {
      coverDetails = cover
    }
  })
  return coverDetails
}

// const getClaimDetails = async (address: any, poolName: string) => {
//   var data: any = {}
//   var coverDetails: any = {}
//   const userData = await getDocs(collection(db, 'users'))
//   userData.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     data[doc.id] = doc.data()
//   })
//   const details = data[address.toLowerCase()]
//   details.covers.map((cover: any) => {
//     if (cover.poolName === poolName) {
//       coverDetails = cover
//     }
//   })
//   return coverDetails
// }

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

// Claims

const getNotes = async (claimId: string) => {
  var data: any = {}
  const claimsData = await getDocs(collection(db, 'claims'))
  claimsData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  var details = data[claimId]
  return details.notes
}

const getVotes = async (claimId: string) => {
  var data: any = {}
  const claimsData = await getDocs(collection(db, 'claims'))
  claimsData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  var details = data[claimId]
  return details.votes
}

const createClaim = async (claimId: number) => {
  const claim = {
    notes: [],
    votes: [],
  }
  var data: any = {}
  const claimData = await getDocs(collection(db, 'claims'))
  claimData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  if (data[`${claimId}`]) {
    console.log('claim already created')
  } else {
    await setDoc(doc(db, 'claims', `${claimId}`), claim)
  }
}

const addNote = async (
  claimId: string,
  senderName: any,
  senderAddress: any,
  text: string
) => {
  const note = {
    name: senderName,
    address: senderAddress,
    text: text,
    date: getCurrentFormattedTime(),
  }
  var data: any = {}
  const claimsData = await getDocs(collection(db, 'claims'))

  claimsData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })

  var temp = data[claimId]
  temp.notes.push(note)
  await setDoc(doc(db, 'claims', claimId), temp)
}

const addVote = async (claimId: any, details: any) => {
  const vote = details
  var data: any = {}
  const claimsData = await getDocs(collection(db, 'claims'))

  claimsData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })

  var temp = data[claimId]
  temp.votes.push(vote)
  console.log(temp)
  await setDoc(doc(db, 'claims', claimId.toString()), temp)
}

const applicationsUpdate = async () => {
  var data: any = {}
  const realtimeData = await getDocs(collection(db, 'realtime'))
  realtimeData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data()
  })
  var temp = data['applications']
  temp.All = !temp.All
  await setDoc(doc(db, 'realtime', 'applications'), temp)
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
  addCover,
  updateCoverQuote,
  switchCoverModifyState,
  getCoverDetails,
  db,
  updateCoverState,
  updateCoverClaimState,
  getNotes,
  addNote,
  getVotes,
  addVote,
  createClaim,
  applicationsUpdate,
}
