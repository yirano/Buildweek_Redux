import axios from 'axios'

export default function axiosWithAuth() {
  const token = localStorage.getItem('token')

  return axios.create({
    baseURL: 'https://expat-journal2.herokuapp.com/api',
    headers: {
      Authorization: token
    }
  })
}