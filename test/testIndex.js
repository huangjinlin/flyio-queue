const fly = require('../index.js')
const moment = require('moment')
function testRequestDoubanMovie() {
  const url = `http://120.76.205.241:8000/movie/douban?kw=${encodeURI('金刚')}&apikey=5YEEiDzpJ98J7QQ1hr5JItov24q1H8gjQIjAAKnsSjFTDkRhBUTHzuBTAqkOLvK3`
  fly.get(url).then((r) => {
    console.log('1.time', moment().format('HH:mm:ss'))
  })
  fly.get(url).then((r) => {
    console.log('2.time', moment().format('HH:mm:ss'))
  })
}
function testRequestMockData() {
  const url = `https://www.easy-mock.com/mock/5b6118f9bf82222ae8fdc5fe/example/mock?t=${Math.random()}`
  /*
  fly.get(url).then((r) => {
    console.log('r', r)
  })
  */
  for (let i = 0; i < 6; i++) {
    fly.get(url).then((r) => {
      console.log('i', i)
      console.log('r', r)
    })
  }
}
// testRequestDoubanMovie()
testRequestMockData()
