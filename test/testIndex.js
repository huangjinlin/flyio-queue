const fly = require('../index.js')
const moment = require('moment')
const url = `http://120.76.205.241:8000/movie/douban?kw=${encodeURI('金刚')}&apikey=5YEEiDzpJ98J7QQ1hr5JItov24q1H8gjQIjAAKnsSjFTDkRhBUTHzuBTAqkOLvK3`
fly.get(url).then((r) => {
  console.log('1.time', moment().format('HH:mm:ss'))
})
fly.get(url).then((r) => {
  console.log('2.time', moment().format('HH:mm:ss'))
})
