import * as token from '../helpers/local-storage'

const { REACT_APP_API_DOMAIN } = process.env
const BASE_URL = REACT_APP_API_DOMAIN

//takes a path variable, as well as a body and method object as parameters, sets those to null and get as defaults, or an empty object and calls the server and returns it's response as json
export default async (path, { body = null, method = 'GET' } = {}) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.getToken()}`
    },
    method
  }
  if (body) Object.assign(options, { body: JSON.stringify(body) })

  const response = await fetch(`${BASE_URL}${path}`, options)
  const json = await response.json()

  return json
}
