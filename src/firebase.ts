import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  deleteUser,
} from 'firebase/auth'

const auth = getAuth()

const verifymail = async (email: string) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      'dance$$183'
    )
    const user = userCredentials.user

    // Send the verification email
    await sendEmailVerification(user)

    // Start listening for changes in email verification status
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if the user's email is verified
        if (user.emailVerified) {
          // User's email is now verified, you can perform actions accordingly
          console.log('User email is verified. Perform actions.')

          // Delete the user account
          await deleteUser(user)

          // Stop listening for further changes
          unsubscribe()
        } else {
          // User's email is not yet verified
          console.log('User email is not verified yet.')
        }
      }
    })
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.error(errorCode, errorMessage)
  }
}
