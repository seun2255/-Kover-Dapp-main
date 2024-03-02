function convertJsonToString(jsonObject: Object) {
  const jsonString = JSON.stringify(jsonObject)
  return jsonString
}

function convertJsonStringToObject(jsonString: string) {
  const jsonObject = JSON.parse(jsonString)
  return jsonObject
}

const applicationStatus: { [key: string]: string } = {
  '0': 'concluded',
  '1': 'applied',
  '2': 'assigned',
}

const resultStatus: { [key: string]: string } = {
  '0': 'pending',
  '1': 'approved',
  '2': 'rejected',
}

// Function to get the corresponding enum value as a string
function getApplicationStatus(enumValue: string) {
  const enumName = applicationStatus[enumValue]
  return enumName
}

function getResultStatus(enumValue: string) {
  const enumName = resultStatus[enumValue]
  return enumName
}

const addContractState = (application: any, kyc_details: any) => {
  const applicationStatus = getApplicationStatus(kyc_details.status.toString())
  const resultStatus = getResultStatus(kyc_details.result.status.toString())

  application.applicationStatus = applicationStatus
  application.resultStatus = resultStatus
  application.reviewer = kyc_details.result.reviewer
  // application.stake_fee = kyc_details.result.stake_fee.toString()
  application.stake_fee = 2.5
  return application
}

function findObjectById(array: any[], id: any) {
  for (const obj of array) {
    if (obj.id == id) {
      console.log('this ran')
      return obj
    }
  }
  // If no matching object is found, you can return null or handle it as needed.
  return null
}

export {
  convertJsonToString,
  convertJsonStringToObject,
  addContractState,
  findObjectById,
}
