const Redis = require("ioredis")
const password = process.env.REDIS_PASS

const redis = new Redis(`redis://default:${password}@redis-11824.c252.ap-southeast-1-1.ec2.redns.redis-cloud.com:11824`)
// const redis = new Redis()

module.exports = redis; 