# Twitter Event Wall

This is just a one-day build inspired by some events where a twitter wall was displayed and anybody could post something which then appears on the display.
Maybe someone of you need something like this. Pull Requests or similar are really welcome!

![Demo picture of googles twitter wall](git/demo.PNG?raw=true "Title")

## Production Setup
1. Clone this repo
2. Configure your .env just copy .env.example to .env.production for example and configure it to your needs.
3. Run in project root folder ```npm run build```
4. On production system you have to run ```npm run api``` to start the api to communicate with the twitter api.
5. Done :) You should be able to refresh your browser on your production system and see the results.

## Configuration
```
TWITTER_CONSUMER_KEY=#Twitter consumer key
TWITTER_CONSUMER_SECRET=#Twitter consumer secret
TWITTER_ACCESS_TOKEN=#Twitter access token
TWITTER_ACCESS_SECRET=#Twitter access secret
VUE_APP_TWITTER_WALL_METHOD=#Here you can instantly switch between two methods 'user' shows all user tweets or 'search' to query by your configuration
VUE_APP_TWITTER_WALL_API=#Where the api is running should be the same host in the most usecases
VUE_APP_TWITTER_WALL_USER=#If you choose WALL_METHOD to 'user' you should set this to your user (screen name!)
VUE_APP_TWITTER_WALL_HASTAG=#Your query you want to search in twitter for example users or hashtags from:ExampleUser #awesome
```
After you change this file you might to restart the service!

## Dev Setup
### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
npm run api
```

#### Compiles and minifies for production
```
npm run build
```

## ToDos
- Error messages
- Add Auto update (maybe Twitter API Streams would be better!)
- Add more features :)
- New Favicon :)