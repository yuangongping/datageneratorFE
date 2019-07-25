import request from '../utils/request.js'
const querystring = require('querystring')

export function apiLogin (form) {
  return new Promise((resolve, reject) => {
    request({
      url: '/login',
      method: 'post',
      data: querystring.stringify({
        username: form.username,
        password: form.password
      })
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}
