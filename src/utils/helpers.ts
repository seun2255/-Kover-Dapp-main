import { ethers, toNumber } from 'ethers'
import axios from 'axios'

function convertJsonToString(jsonObject: Object) {
  const jsonString = JSON.stringify(jsonObject)
  return jsonString
}

function convertJsonStringToObject(jsonString: string) {
  const jsonObject = JSON.parse(jsonString)
  return jsonObject
}

function extractHash(url: string) {
  return url.split('/').pop()
}
//
// * Kyc FApplication Enum formatters
//

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

//
// * Policy Application enum formatters
//
const policyApplicationStatus: { [key: string]: string } = {
  '0': 'concluded',
  '1': 'applied',
  '2': 'assigned',
  '3': 'assesed',
}

const policyStatus: { [key: string]: string } = {
  '0': 'inactive',
  '1': 'user_decision_pending',
  '2': 'funds_pending',
  '3': 'active',
  '4': 'paused',
}

const claimStage: { [key: string]: string } = {
  '0': 'initiated',
  '1': 'assigned',
  '2': 'appealed',
  '3': 'appeal_assigned',
  '4': 'validation',
  '5': 'reassessment_pending',
  '6': 'concluded',
}

const policyApplicationType: { [key: string]: string } = {
  '0': 'application',
  '1': 'modification',
  '2': 'extension',
}

function getPolicyApplicationStatus(enumValue: string) {
  const enumName = policyApplicationStatus[enumValue]
  return enumName
}

function getClaimStage(enumValue: string) {
  const enumName = claimStage[enumValue]
  return enumName
}

function getPolicyStatus(enumValue: string) {
  const enumName = policyStatus[enumValue]
  return enumName
}

function getPolicyApplicationType(enumValue: string) {
  const enumName = policyApplicationType[enumValue]
  return enumName
}

const addContractState = (application: any, kyc_details: any) => {
  const applicationStatus = getApplicationStatus(kyc_details.status.toString())
  const resultStatus = getResultStatus(kyc_details.result.status.toString())

  const currentDate = new Date()
  const unixTimestamp = Math.floor(currentDate.getTime() / 1000)

  const submit_result_time = toNumber(kyc_details.result.stake_wait_time)
  const result_wait_time = toNumber(kyc_details.result.result_wait_time)
  const assign_timestamp = toNumber(kyc_details.result.assign_timestamp)
  const submit_time_left = 0
  // assign_timestamp + 0 - unixTimestamp >= 0
  //   ? assign_timestamp + 0 - unixTimestamp
  //   : 0

  application.applicationStatus = applicationStatus
  application.resultStatus = resultStatus
  application.reviewer = kyc_details.result.reviewer
  application.submit_result_time = submit_result_time
  application.result_wait_time = result_wait_time
  application.assign_timestamp = assign_timestamp
  application.submit_time_left = submit_time_left
  // application.stake_fee = kyc_details.result.stake_fee.toString()
  application.stake_fee = 25
  return application
}

const addKycReviewerState = (application: any, kyc_details: any) => {
  application.has_applied = kyc_details.has_applied
  application.is_expert = kyc_details.is_expert

  return application
}

const addPolicyContractState = (application: any, policy_details: any) => {
  const applicationStatus = getPolicyApplicationStatus(
    policy_details.application_status.toString()
  )
  const status = getPolicyStatus(policy_details.status.toString())
  const resultStatus = getResultStatus(policy_details.result.status.toString())

  const currentDate = new Date()
  const unixTimestamp = Math.floor(currentDate.getTime() / 1000)

  const submit_result_time = toNumber(
    policy_details.result.reviewer_stake_wait_time
  )
  const result_wait_time = toNumber(policy_details.result.assessment_wait_time)
  const assign_timestamp = toNumber(policy_details.result.assign_timestamp)
  const submit_time_left = 0
  // assign_timestamp + 0 - unixTimestamp >= 0
  //   ? assign_timestamp + 0 - unixTimestamp
  //   : 0

  application.applicationStatus = applicationStatus
  application.resultStatus = resultStatus
  application.policyStatus = status
  application.fee = toNumber(policy_details.result.fee)
  application.reviewer = policy_details.result.reviewer
  application.submit_result_time = submit_result_time
  application.result_wait_time = result_wait_time
  application.assign_timestamp = assign_timestamp
  application.submit_time_left = submit_time_left
  // application.stake_fee = policy_details.result.stake_fee.toString()
  application.stake_fee = 25
  return application
}

const addClaimsContractState = async (application: any, claim_details: any) => {
  const claimStage = getClaimStage(claim_details.stage)
  const resultStatus = getResultStatus(
    claim_details.adjustor_params.status.toString()
  )
  const reportFile = claim_details.adjustor_params.report_ipfs_hash.toString()
  const reportResponse =
    reportFile === ''
      ? { data: { documents: [] } }
      : await axios.get(reportFile)

  const currentDate = new Date()
  const unixTimestamp = Math.floor(currentDate.getTime() / 1000)

  // const submit_result_time = toNumber(
  //   claim_details.result.reviewer_stake_wait_time
  // )
  // const result_wait_time = toNumber(claim_details.result.assessment_wait_time)
  const assign_timestamp = toNumber(
    claim_details.adjustor_params.assign_timestamp
  )
  const submit_time_left = 0
  // assign_timestamp + 0 - unixTimestamp >= 0
  //   ? assign_timestamp + 0 - unixTimestamp
  //   : 0

  // application.applicationStatus = applicationStatus
  application.stage = claimStage
  application.resultStatus = resultStatus
  // application.policyStatus = status
  // application.fee = toNumber(claim_details.result.fee)
  application.reviewer = claim_details.adjustor
  // application.submit_result_time = submit_result_time
  // application.result_wait_time = result_wait_time
  application.assign_timestamp = assign_timestamp
  application.submit_time_left = submit_time_left
  application.report = reportResponse.data.documents[0]
  // application.stake_fee = claim_details.result.stake_fee.toString()
  application.stake_fee = 25
  return application
}

const formatValidatorData = (data: any) => {
  var validator: any = {}

  validator.isYes = data.is_yes
  validator.votePower = Number(ethers.formatEther(data.vote_power))

  return validator
}

function findObjectById(array: any[], id: any) {
  for (const obj of array) {
    if (obj.id == id) {
      return obj
    }
  }
  // If no matching object is found, you can return null or handle it as needed.
  return null
}

function convertLinkToText(link: string): string {
  // Split the link by '/'
  const parts = link.split('/')

  // Extract the relevant parts
  const type = parts[2].split('-')[0]
  const country = parts[2].split('-')[1]
  const number = parts[2].split('-')[2]

  // Construct the output text
  return `${type.toUpperCase()} #${number}`
}

function removeItemFromArray(documents: any, linkToRemove: string) {
  let array = [...documents]
  for (let i = 0; i < array.length; i++) {
    if (array[i].link === linkToRemove) {
      array.splice(i, 1) // Remove the object at index i
      i-- // Decrement i to adjust for the removed element
    }
  }
  return array
}

function isLinkPresent(array: any, linkToCheck: string) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].link === linkToCheck) {
      return true // Link found, return true
    }
  }
  return false // Link not found
}

export {
  convertJsonToString,
  convertJsonStringToObject,
  addContractState,
  addKycReviewerState,
  findObjectById,
  convertLinkToText,
  removeItemFromArray,
  isLinkPresent,
  addPolicyContractState,
  addClaimsContractState,
  extractHash,
  formatValidatorData,
}
