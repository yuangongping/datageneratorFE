import request from '../utils/request.js';
const querystring = require('querystring')

export function apiInsertCase(params) {
    return new Promise((resolve, reject) => {
      request({
        url: '/addcase',
        method: 'post',
        data: querystring.stringify({
            nick_name: params.nick_name,
            table_name: params.table_name,
            configs: JSON.stringify(params.config)
          })
      }).then((res) => {
        resolve(res)
      }).catch((e) => {
        reject(e)
      })
    })
  }

  
export function apiInsertSuggestion(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/addsuggestion',
      method: 'post',
      data: querystring.stringify({
          nick_name: params.nick_name,
          content: params.content,
        })
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

export function apiListSuggestion() {
  return new Promise((resolve, reject) => {
    request({
      url: '/listsuggestion',
      method: 'get'
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

export function apiListCase() {
  return new Promise((resolve, reject) => {
    request({
      url: '/listcase',
      method: 'get'
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

export function apiUpdateCase(params) {
  const num = params.islike == true ? params.like_num: params.quote_num;
  return new Promise((resolve, reject) => {
    request({
      url: '/updatecase',
      method: 'post',
      data: querystring.stringify({
        id: params.id,
        num: num,
        islike: params.islike
      })
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}