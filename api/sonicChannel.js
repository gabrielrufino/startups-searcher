const SonicChannel = require('sonic-channel')

const options = {
  host: 'localhost',
  port: 1491,
  auth: 'SecretPassword'
}

const handlers = piece => ({
  connected : () => {
    console.info(`Sonic Channel succeeded to connect to host (${piece}).`)
  },
  disconnected : () => {
    console.error(`Sonic Channel is now disconnected (${piece}).`)
  },
  timeout : () => {
    console.error(`Sonic Channel connection timed out (${piece}).`)
  },
  retrying : () => {
    console.error(`Trying to reconnect to Sonic Channel (${piece})...`)
  },
  error : (error) => {
    console.error(`Sonic Channel failed to connect to host (${piece}).`, error)
  }
})

const ingest = new SonicChannel.Ingest(options).connect(handlers('ingest'))

const search = new SonicChannel.Search(options).connect(handlers('search'))

module.exports = {
  ingest,
  search
}
