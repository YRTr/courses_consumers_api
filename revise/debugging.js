const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const express = require('express');
const app = express();

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

// Db work...
dbDebugger('Connected to the database...');

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on port ${port}...`));


/* -----------------------
=> environment variables setup
$set NODE_ENV=development
// setting up a debugging message using env variables

$set DEBUG=app:startup
$node index.js
        --> app:startup Morgan enabled...

// setting up multiple debugging messages
$set DEBUG=app:startup,app:db  (or)  $set DEBUG=app:*
$node index.j
        --> app:startup Morgan enabled...
        --> app:db Connected to the database...
        Here, app:startup }
              app:db      } are called name spaces

// shortcut to set an environment variable and run the app at once
$DEBUG=app:db nodemon index.js
------------------------*/