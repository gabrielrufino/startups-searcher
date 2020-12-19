const express = require('express')
const { v4: uuid } = require('uuid')

const config = require('./config.json')
const db = require('./db')
const { ingest, search } = require('./sonicChannel')

const app = express()

app.use(express.json())

app.get('/', (_request, response) => {
  return response.json({ status: 'ok' })
})

app.post('/startups', async (request, response) => {
  const { name, description, website } = request.body
  const id = uuid()

  const startup = { id, name, description, website }

  await Promise.all([
    ingest.push(
      'startups',
      'default',
      `${id},${name}`,
      `${name} ${description} ${website}`,
      { lang: 'por' }
    ),
    db.get('startups').push(startup).write()
  ])

  return response
    .status(201)
    .json(startup)
})

app.get('/suggest', async (request, response) => {
  const { q } = request.query

  const result = await search.suggest(
    'startups',
    'default',
    q,
    { limit: 5 }
  )

  response.json(result)
})

app.get('/search', async (request, response) => {
  const { q } = request.query

  const result = await search.query(
    'startups',
    'default',
    q,
    { lang: 'por' }
  )

  response.json(
    result.map(startup => {
      const [id, name] = startup.split(',')

      return {
        id,
        name
      }
    })
  )
})

app.get('/startups/:id', async (request, response) => {
  const { id } = request.params

  const startup = await db
    .get('startups')
    .find({ id })
    .value()

  if (!startup) {
    return response.status(404).json({ message: 'Startup not found' })
  }

  return response.json(startup)
})

app.listen(config.PORT, () => console.log(`API Listening on ${config.PORT}`))
