# Bunny test

I'm very happy for doing this test, because i could apply some ideas and techniques of microservices. The diagram of this architecture is on the file `/diagram.pdf`

## Requirements

- docker
- docker-compose

## Steps run Application

- Clone this repository
- go to 'bunny' folder `cd bunny`
- run `docker-compose up --build`
- access `http://localhost:8080`

## Tests
I just create frontend unit/integrates tests on `/client`

Backends Unit tests are missing due to lack of time.

- go to `/client`
- run `yarn install && yarn test`
- coverage reports are in `/client/coverage/lcov-report/index.html` open in chrome
