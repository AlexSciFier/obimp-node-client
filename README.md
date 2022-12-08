# Bimoid Nodejs WEB Client

Web wersion of [Bimoid](https://bimoid.com/) chat.

## Development

Backend is runing with [Socket.IO](https://socket.io/) and implements [OBIMP (dec 2012)](https://maxtdp.com/download/bimoid/OBIMP_Draft_1_1_Rev_C.zip) protocol.

Implemented:

- [x] Login
- [x] Instant messaging
- [x] Presence status
- [x] File transfer

Frontend is build with [React](https://reactjs.org/) [(CRA)](https://create-react-app.dev/) with TailwindCSS and [Socket.IO](https://socket.io/).

- Clone this project
- `npm run install`
- Run 2 terminals
- In first: cd into server `cd server` and run `npm run start`
- In second: cd into bimoid-react-client `cd bimoid-react-client` amd run react `npm run start`

## Deploy

TODO
