import {v4 as uuidv4} from 'uuid'

export const getUUID = () => {
  let token = localStorage.getItem('UUID_TOKEN')
  if (!token) {
    token = uuidv4()
    localStorage.setItem('UUID_TOKEN', token)
  }
  return token
}

export const setToken = (token) => {
  localStorage.setItem('TOKEN', token)
}

export const getToken = () => {
  return localStorage.getItem('TOKEN')
}

export const removeToken = () => {
  localStorage.removeItem('TOKEN')
}
