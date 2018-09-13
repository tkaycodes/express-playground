##Getting started:


###1. Install dependencies:

`npm install`


### 2. Start Mongo db:

1) Download mongoDB if not already downloaded:
https://www.mongodb.com/download-center#community

2) `cd` into folder where your mongodb is installed

3) `cd` into `/bin` folder

4) run `$ ./mongod` or  `$ sudo ./mongod`

This will start your mongodb dabatabase (default `port 27017`)

### 3. Seed Mongo db:

`cd` into project dir, go into `/seeds` folder, run then command `node product-seeder.js`

###4. Start Server:

`nodemon start`, this will run the server on `port 3000` by default

Note: This app uses nodemon, so you dont need to stop / re-start your server every time a change is made.

