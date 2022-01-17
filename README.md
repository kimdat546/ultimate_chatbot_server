# Ultimate Chatbot for Education - Admin server

_This project was bootstrapped with [NodeJS](https://github.com/nodejs/nodejs.org)._

## Deployment in development mode


### `Start`

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to connect api.

```
yarn run server
```

## Deployment in production mode with docker

### Install docker on server

### `Build image`

Run command

```
docker build -t kimdat546/ultimate_chatbot_server .
```

### `Run container`

Run command

```
docker run -d -p 5000:5000 --name adminserver kimdat546/ultimate_chatbot_server
```
### Open port firewall
- enable ufw
- allow port 5000
### Finally, get APT from IP address server