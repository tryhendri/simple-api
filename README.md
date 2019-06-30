# Simple nodejs apps as starting point to create a service

Can not deploy to heroku yet since I still figure it out how to connect into cloud.mongodb(atlass) from mlabs. mongodb adds-on has changed since the the service of mlabs moved to attlas.
All the endpoint has defined on postman collection, to generate header authorization I used express-jwt and we have endpoint to generate token on /auth.

### Installation


Install the dependencies and devDependencies 
```sh
$ npm install
```

Configuration can be updated on config.json

Then run the command

```sh
$ npm run start-dev
```


# Todo
- Deploy to heroku  
- Using Swagger for documentation 
- Test

