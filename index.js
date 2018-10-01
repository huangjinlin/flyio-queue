const fly = require('flyio')
const moment = require('moment')
const _ = require('underscore')

let interval = 1
let requestTime = moment()
function setOptions(options) {
  if (options && options.interval) {
    interval = options.interval
  }
}
function queue() {
  return new Promise((resolve, reject) => {
    const now = moment()
    if (now.isBefore(requestTime)) {
      const milliseconds = requestTime.valueOf() - now.valueOf()
      setTimeout(() => {
        resolve()
      }, milliseconds)
    } else {
      requestTime = now
      resolve()
    }
    requestTime.add(interval, 's')
  })
}
function get(url, param, options) {
  setOptions(options)
  return new Promise((resolve, reject) => {
    queue().then(() => {
      // setTimeout(() => {
      //   resolve()
      // }, 500)
      fly.get(url, _.extend({}, param), options)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
    })
  })
}
function post() {
  setOptions(options)
  return new Promise((resolve, reject) => {
    queue().then(() => {
      fly.post(url, _.extend({}, param), options)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
    })
  })
}
const obj = _.extend({}, fly, {
  get: get,
  post: post
})
module.exports = obj
