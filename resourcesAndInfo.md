## Discogs stuff

- api docs: https://www.discogs.com/developers#page:authentication
- - (key and secret currently env variables in "start:dev:seed")

Sample Search request:

$ curl "https://api.discogs.com/database/search?q=Nirvana" -H "Authorization: Discogs key=foo123, secret=bar456"