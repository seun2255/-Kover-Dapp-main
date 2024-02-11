function convertJsonToString(jsonObject: Object) {
  const jsonString = JSON.stringify(jsonObject)
  return jsonString
}

function convertJsonStringToObject(jsonString: string) {
  const jsonObject = JSON.parse(jsonString)
  return jsonObject
}

export { convertJsonToString, convertJsonStringToObject }
