const fly = require('flyio')
fly.get(`https://www.easy-mock.com/mock/5b6118f9bf82222ae8fdc5fe/example/mock?t=${Math.random()}`, {})
.then(function (response) {
  console.log('response', response)
})
.catch(function (error) {
  console.log('error', error)
})
