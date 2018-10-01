<!-- not to html -->
# flyio-queue
request url interval some time

## use
```
const fly = require('flyio-queue')
fly.get(url,{},{ interval: 1}).then((r) => {
  console.log('1.time', moment().format('HH:mm:ss'))
})
fly.post(url,{},{ interval: 1}).then((r) => {
  console.log('1.time', moment().format('HH:mm:ss'))
})
```
