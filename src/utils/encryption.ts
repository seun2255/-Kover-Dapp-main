// Convert Uint8Array to Base64 string
function uint8ArrayToBase64String(data: Uint8Array): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (reader.result && typeof reader.result === 'string') {
        // Now TypeScript knows reader.result is a string
        const base64String = reader.result.split(',')[1]
        resolve(base64String)
      } else {
        reject('Failed to convert data')
      }
    }
    reader.readAsDataURL(new Blob([data]))
  })
}
// Convert Base64 string to Uint8Array
function base64StringToUint8Array(base64String: any) {
  // Convert Base64 string to a buffer
  const binaryString = atob(base64String)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes
}

const base64Key = 'W7XFL2Rd3Wyx1GT+muC+1Zn7QQzN2kX6eTlQp0B5bWM='

async function importKeyFromBase64(base64Key: string) {
  // Convert the base64-encoded string back to raw bytes
  const rawBytes = new Uint8Array(
    Array.from(atob(base64Key), (c) => c.charCodeAt(0))
  )

  // Import the raw bytes as a CryptoKey
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    rawBytes,
    { name: 'AES-GCM' },
    true,
    ['encrypt', 'decrypt']
  )

  return cryptoKey
}

async function encryptText(text: string) {
  const key = await importKeyFromBase64(base64Key)
  const encodedText = new TextEncoder().encode(text)
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: new Uint8Array(12) },
    key,
    encodedText
  )
  return new Uint8Array(encryptedData)
}

async function decryptText(encryptedData: Uint8Array) {
  const key = await importKeyFromBase64(base64Key)
  const decryptedData = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(12) },
    key,
    encryptedData
  )
  return new TextDecoder().decode(decryptedData)
}

async function encryptFile(file: any) {
  const key = await importKeyFromBase64(base64Key)
  const arrayBuffer = await file.arrayBuffer()
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: new Uint8Array(12) },
    key,
    arrayBuffer
  )
  return new Blob([encryptedData], { type: file.type })
}

async function encryptAndHandleFile(originalFile: File) {
  // Encrypt the file
  const encryptedBlob = await encryptFile(originalFile)

  // Create a new File object with a name based on the original file name
  const encryptedFile = new File(
    [encryptedBlob],
    `encrypted_${originalFile.name}`,
    {
      type: encryptedBlob.type,
      lastModified: new Date().getTime(),
    }
  )

  // Pass the encryptedFile to your next function
  return encryptedFile
}

// async function decryptFile(encryptedBlob: Blob) {
//   const key = await importKeyFromBase64(base64Key)
//   const arrayBuffer = await encryptedBlob.arrayBuffer()
//   const decryptedData = await window.crypto.subtle.decrypt(
//     { name: 'AES-GCM', iv: new Uint8Array(12) },
//     key,
//     arrayBuffer
//   )

//   // Use the original MIME type of the encrypted file
//   const mimeType = encryptedBlob.type

//   // Create object URL for the decrypted data
//   const decryptedUrl = URL.createObjectURL(
//     new Blob([decryptedData], { type: mimeType })
//   )

//   return decryptedUrl
// }

async function decryptFile(encryptedFile: File): Promise<File> {
  const key = await importKeyFromBase64(base64Key)
  const arrayBuffer = await encryptedFile.arrayBuffer()
  const decryptedData = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(12) },
    key,
    arrayBuffer
  )

  // Create a new Blob with the decrypted data
  const decryptedBlob = new Blob([decryptedData], { type: encryptedFile.type })

  // Create a new File object with a name based on the original encrypted file name
  const decryptedFile = new File(
    [decryptedBlob],
    `decrypted_${encryptedFile.name.replace(/^encrypted_/, '')}`, // Remove the 'encrypted_' prefix
    {
      type: decryptedBlob.type,
      lastModified: new Date().getTime(),
    }
  )

  return decryptedFile
}

async function decryptAndHandleFile(encryptedFile: File): Promise<string> {
  // Decrypt the file
  const decryptedFile = await decryptFile(encryptedFile)

  // Create a URL object for the decrypted file
  const decryptedUrl = URL.createObjectURL(decryptedFile)

  // Pass the decryptedUrl or perform additional actions as needed
  return decryptedUrl
}

export { encryptText, encryptAndHandleFile, decryptText, decryptAndHandleFile }
