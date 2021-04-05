# 💬 jIRC-Chat

![awesome badge](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)

Project in which I want to replicate mIRC or the mythical IRCAP in a simple way. At first I will do it with a connection to my own server and later I want to do it with a connection to an IRC server. This last part, I will mount it in Electron maybe in another repository.

![jirc-gif](https://user-images.githubusercontent.com/22279904/113570823-68b36900-9615-11eb-9c92-ecf6275d0031.gif)

## Run the project

The first thing you have to do is clone the repository locally, and install the dependencies with your favorite dependency manager: yarn or npm.

### Config URL and PORT

You must change the file `/src/config.env.json` to `/src/config.json` and then inside you can change the port if you need it.

### Server

For the chat to work, you have to leave the server running, so dont close it or it wont work for you.

To start the server you must run the following command:

```console
npm run server:start
```

or

```console
yarn server:start
```

### Client

To run the client made in React, you have to put the following command:

```console
npm run client:start
```

or

```console
yarn cilent:start
```

If you have problems with your Mac with A1 chipset, you can run the following command:

```console
npm run client:m1-start
```

or

```console
yarn client:m1-start
```

## Support me

If you like what I do and want to help me financially, you can buy me a coffee

[![Support me, send me a coffee](https://raw.githubusercontent.com/mrcodedev/frontend-developer-resources/main/images/coffe-share.jpeg)](https://www.buymeacoffee.com/mrcodedev "Buy me a coffee :D")

👉☕️ <https://www.buymeacoffee.com/mrcodedev>
