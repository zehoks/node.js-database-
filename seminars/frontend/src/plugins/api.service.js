import axios from 'axios'

const ApiService = {
  init() {
    axios.defaults.baseURL = 'http://localhost:80'
  },

  get(resource) {
    return axios.get(resource)
  },
}

export default ApiService
