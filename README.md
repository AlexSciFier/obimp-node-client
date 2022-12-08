# Bimoid Nodejs WEB Client

Web wersion of [Bimoid](https://bimoid.com/) chat.

## Development

Backend is runing with [Socket.IO](https://socket.io/) and implements [OBIMP (dec 2012)](https://maxtdp.com/download/bimoid/OBIMP_Draft_1_1_Rev_C.zip) protocol.

Implemented:

- [ ] 0x0001, Common. (OBIMP_BEX_COM)
- [ ] 0x0002, Contact list. (OBIMP_BEX_CL)
- [ ] 0x0003, Presence (OBIMP_BEX_PRES)
- [ ] 0x0004, Instant messaging (OBIMP_BEX_IM)
- [ ] 0x0005, Users directory (OBIMP_BEX_UD)
- [ ] 0x0006, User avatars (OBIMP_BEX_UA)
- [ ] 0x0007, File transfer (OBIMP_BEX_FT)
- [ ] 0x0008, Transports (OBIMP_BEX_TP)

Frontend is build with [React](https://reactjs.org/) [(CRA)](https://create-react-app.dev/) with TailwindCSS and [Socket.IO](https://socket.io/).

- Clone this project
- `npm run install`
- Run 2 terminals
- In first: cd into server `cd server` and run `npm run start`
- In second: cd into bimoid-react-client `cd bimoid-react-client` amd run react `npm run start`

## Deploy

TODO
