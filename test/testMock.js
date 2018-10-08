const fly = require('flyio')
const axios = require('axios')
function flyGet() {
  setTimeout(() => {
    fly.get(`https://www.easy-mock.com/mock/5b6118f9bf82222ae8fdc5fe/example/mock?t=${Math.random()}`, {})
    .then(function (response) {
      console.log('response', response)
    })
    .catch(function (error) {
      console.log('error', error)
    })
  }, 2000)
}
function flyRequestGet() {
  fly.$http
    .get(`https://www.easy-mock.com/mock/5b6118f9bf82222ae8fdc5fe/example/mock?t=${Math.random()}`)
    .on('response', function(response) {
      console.log(response.statusCode) // 200
      console.log(response.headers['content-type']) // 'image/png'
    })
}
function axiosGet() {
  axios.get(`https://www.easy-mock.com/mock/5b6118f9bf82222ae8fdc5fe/example/mock?t=${Math.random()}`, { params: {} }).then(res => {
    console.log(response.statusCode) // 200
    console.log(response.headers['content-type']) // 'image/png'
  }).finally(() => {

  })
}
// flyRequestGet()
axiosGet()
