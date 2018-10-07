let pool = []
let p1 = new Promise((resolve, reject) => {
  let cb = () => {
    setTimeout(() => {
      resolve()
    }, 500)
  }
  pool.push(cb)
})
p1.then(value => {
  console.log('here', )
})

let o = pool.shift()
// console.log('o', o)
o()
