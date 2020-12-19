# Startups Searcher

Searcher for startups using sonic.

### Getting started

Cloning the repo:
```bash
git clone https://github.com/gabrielrufino/startups-searcher.git
```

Starting the infra:
```bash
docker-compose up -d
```

Initializing the api:
```bash
cd api
npm install
npm start
```

### API Routes

##### Healthcheck

```
GET /
```

##### Register startup

```
POST /startups
```

**Body**

```json
{
  "name": "Heppi",
  "description": "Arrecadamos dinheiro para sua festa de formatura da forma mais inteligente possível",
  "website": "https://heppi.io"
}
```

##### Search startups

```
GET /search?q=formatura
```

##### Detail startup

```
GET /startup/:id
```
