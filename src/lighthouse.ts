import lighthouse from '@lighthouse-web3/sdk'

const uploadJsonData = async (Json: string) => {
  const response = await lighthouse.uploadText(
    Json,
    process.env.REACT_APP_LIGHTHOUSE_API_KEY as string
  )
  const link = 'https://gateway.lighthouse.storage/ipfs/' + response.data.Hash
  return link
}

export { uploadJsonData }
