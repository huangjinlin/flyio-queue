const fly = require('flyio')
const moment = require('moment')
const _ = require('underscore')

let interval = 1
let requestTime = moment()
let poolSize = 1
let currentPoolSize = 0
let pool = []
function setOptions(options) {
  if (options && options.interval) {
    interval = options.interval
  }
  if (options && options.poolSize) {
    poolSize = options.poolSize
  }
}
function queue() {
  return new Promise((resolve, reject) => {
    const now = moment()
    if (now.isBefore(requestTime)) {
      const milliseconds = requestTime.valueOf() - now.valueOf()
      setTimeout(() => {
        // console.log('queue.resolve()', moment().format('HH:mm:ss'))
        resolve()
      }, milliseconds)
    } else {
      requestTime = now
      // console.log('queue.resolve()', moment().format('HH:mm:ss'))
      resolve()
    }
    requestTime.add(interval, 's')
  })
}
function inPool(cb) {
  pool.push(cb)
  outPool()
}
function outPool() {
  if (pool.length > 0 && currentPoolSize > -1 && currentPoolSize < poolSize) {
    let cb = pool.shift()
    currentPoolSize += 1
    // console.log('outPool')
    // console.log('currentPoolSize', currentPoolSize)
    // console.log('time', moment().format('HH:mm:ss'))
    queue().then(() => {
      cb()
    }, () => {
      cb()
    })
  }
}
function request(url, param, options, method) {
  let p =   new Promise((resolve, reject) => {
    inPool(() => {
      // setTimeout(() => {
      //    resolve({data: {name: 'hjl'}})
      // }, _.random(5, 8)*1000)
      fly[method](url, _.extend({}, param), options)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
    })
  })
  p.then(() => {
    currentPoolSize -= 1
    // console.log('done')
    // console.log('currentPoolSize', currentPoolSize)
    // console.log('time', moment().format('HH:mm:ss'))
    outPool()
  }, () => {
    currentPoolSize -= 1
    outPool()
  })
  return p
}
function get(url, param, options) {
  return request(url, param, options, 'get')
}
function post(url, param, options) {
  return request(url, param, options, 'post')
}
const obj = _.extend({}, fly, {
  get: get,
  post: post,
  setOptions: setOptions
})
module.exports = obj
