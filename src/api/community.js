import request from '../utils/request.js';
const querystring = require('querystring')

// 意见api接口
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

export function totalSuggestionAdmin() {
  return new Promise((resolve, reject) => {
    request({
      url: '/totalsuggestionadmin',
      method: 'get'
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

export function listSuggestionAdmin(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/listsuggestionadmin',
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

export function adoptSuggestion(id) {
  return new Promise((resolve, reject) => {
    request({
      url: '/adoptsuggestion',
      method: 'get',
      params: {
        id
      }
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

export function delSuggestion(id) {
  return new Promise((resolve, reject) => {
    request({
      url: '/delsuggestion',
      method: 'get',
      params: {
        id
      }
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}



// 案例api接口
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

export function delCase(id) {
  return new Promise((resolve, reject) => {
    request({
      url: '/delcase',
      method: 'get',
      params: {
        id
      }
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

export function adoptCase(id) {
  return new Promise((resolve, reject) => {
    request({
      url: '/adoptcase',
      method: 'get',
      params: {
        id
      }
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

export function recommendCase(id, star) {
  return new Promise((resolve, reject) => {
    request({
      url: '/recommendcase',
      method: 'get',
      params: {
        id,
        star
      }
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

export function listCaseAdmin(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/listcaseadmin',
      method: 'post',
      data: querystring.stringify({
        page: params.page,
        num: params.num,
      })
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

export function totalCaseAdmin(){
  return new Promise((resolve, reject) => {
    request({
      url: '/totalcaseadmin',
      method: 'get'
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}


// 回复意见api
export function replySuggestion(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/replysuggestion',
      method: 'post',
      data: querystring.stringify(params)
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

// 用户记录表展示
export function getUserRecord(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/getuserrecord',
      method: 'get',
      params:  params
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

// 获取总记录数
export function totalRecord() {
  return new Promise((resolve, reject) => {
    request({
      url: '/totalRecord',
      method: 'get'
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}
