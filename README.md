# QuestBoard
This web page is meant to help League of Legends players to find misions and other players.
# Technologies
This web page was made with:
* Frameworks, libraries, databases
  * Bootstrap
  * React
  * Node.js
  * Express.js
  * MongoDB
  
* Languages
  * HTML 
  * CSS 
  * JavaScript
  * JSX
# How to run
## Prerequisites
[Install MongoDB](https://docs.mongodb.com/manual/installation/)

[Install Node.js](https://nodejs.org/es/download/)

[Install yarn](https://yarnpkg.com/es-ES/docs/install)

## Clone
Open your CMD en clone the repositorie, using the next command:
```
  git clone https://github.com/Berserker1523/QuestBoard.git 
```

## Install dependencies
### Node + Express
1. Access the directory from your cmd
```
  cd QuestBoard
```
2. Run the next command and wait.
```
  yarn install
```
3. To be able to use a database, Auth0 and Riot Games API you must create a .env file in the root directory or define as environmental variables: 
```
  MONGO_URL="your_mongo_database_url"
  AUTH0_DOMAIN="yourauhth0domain.auth0.com"
  AUTH0_CLIENT_ID="asdasdaasdasdasdasdasdas"
  AUTH0_CLIENT_SECRET="asdasdsa-asdasdasdasdasda-sdasdadas"
  AUTH0_CALLBACK_URL="http://yourdomain/auth/callback"
  RIOT_GAMES_API_KEY="qweqweqweqw-qweeqweqweq-eqweqweqweqwe"
  FRONT_URL="http://yourdomain"
```
4. If you run your back server locally, you must have it in 3001 port and put localhost:3001 in yourdomain of AUTH0_CALLBACK_URL.

### React
1. Access the ./front directory from your cmd
```
  cd front
```
2. Run the next command and wait.
```
  yarn install
```

## Run the back-end
1. Come back to the main directory (QuestBoard).
```
  cd ..
```
2. Run the next command to start the back-end.
```
  yarn start
```

## Run the front-end
1. Go again to the front directory (QuestBoard/front).
```
  cd front
```
2. Run the next command to start the front-end.
```
  yarn start
```
3. Now you can go to localhost:3000 on your browser, it should look like the screenshots below.

# Author
María José Ocampo Vargas - https://github.com/mjocampov
Jesús Orlando Cárcamo Posada - https://github.com/Berserker1523
# Screenshots
![alt text](https://66.media.tumblr.com/b71ff2ebe78d456765adee8ea6847096/6486d1cb9f4db569-bf/s540x810/9780b745b0a91b36a753ea275f2fe197f63d6b23.png)
# MIT License
You can find the license right here: https://github.com/Berserker1523/QuestBoard/blob/master/LICENSE
