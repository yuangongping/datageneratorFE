import request from '../utils/request.js';
const querystring = require('querystring')


export function totalSuggestion() {
  return new Promise((resolve, reject) => {
    request({
      url: '/totalsuggestion',
      method: 'get'
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

export function addCase(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/addcase',
      method: 'post',
      data: querystring.stringify({
        nick_name: params.nick_name,
        table_name: params.table_name,
        quote_num: params.quote_num,
        like_num: params.like_num,
        configs: JSON.stringify(params.configs)
      })
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

export function addSuggestion(params) {
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

export function listSuggestion(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/listsuggestion',
      method: 'post',
      data: querystring.stringify({
        page: params.page,
        num: params.num
      })
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

export function totalCase() {
  return new Promise((resolve, reject) => {
    request({
      url: '/totalcase',
      method: 'get'
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

export function listCase(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/listcase',
      method: 'post',
      data: querystring.stringify({
        page: params.page,
        num: params.num
      })
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

export function updateCase(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/updatecase',
      method: 'post',
      data: querystring.stringify({
        id: params.id,
        type: params.type
      })
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}