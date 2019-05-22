;(async function() {
  const Redis = require('ioredis')

  const redis = new Redis({
    port: 6379,
    password: '13717022872.',
  })

  await redis.set('a', 123)
  await redis.setex('c', 10, 123)
  const keys = await redis.keys('*')
  console.log(keys)
  console.log(await redis.get('a'))
})()
