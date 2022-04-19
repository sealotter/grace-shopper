## Discogs stuff

- api docs: https://www.discogs.com/developers#page:authentication
- DISCOGS_KEY=iqaccrEsxevhQaumXCuv 
- DISCOGS_SECRET=egjaWRESFhqAxMEihyVHStXezYVOjqjN
- - (key and secret currently env variables in "start:dev:seed")

Sample Search request:

$ curl "https://api.discogs.com/database/search?q=Nirvana" -H "Authorization: Discogs key=foo123, secret=bar456"