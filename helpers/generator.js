// It can be used with a backend.
// import Axios from 'axios'

// const axios = Axios.create({
//   baseURL: process.env.STRAPI_URL,
// })

const PROFILES = ['nasa', 'google', 'nike', 'twitter', 'apple', 'microsoft']

export default function () {
  const routes = []
  for (const profile of PROFILES) {
    // let param = '';
    // let query = '';
    // if (Array.isArray(profile)) {
    //   param = profile[0]
    //   query = profile.splice(1).join('&')
    // }
    routes.push(`/${profile}`)
  }
  return routes
}