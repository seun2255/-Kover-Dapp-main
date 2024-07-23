import axios from 'axios'

const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/'

let response = null
const getCurrencyData = async () => {
  new Promise(async (resolve, reject) => {
    try {
      response = await axios.get(
        `${corsAnywhereUrl}https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`,
        {
          headers: {
            'X-CMC_PRO_API_KEY': process.env.REACT_APP_MARKET_API_KEY as string,
          },
        }
      )
    } catch (ex) {
      response = null
      // error
      console.log(ex)
      reject(ex)
    }
    if (response) {
      // success
      const json = response.data
      console.log(json)
      resolve(json)
    }
  })
}

export default getCurrencyData
