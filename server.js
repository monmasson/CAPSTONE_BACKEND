///////////////
// CONSTANTS //
///////////////

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;
const PORT = process.env.PORT || 5000;
const exerciseRoute = require('./Route/exerciseRouter');
const userRoute = require('./Route/userRouter');
const blogRouter= require('./Route/blogRouter');

////////////////////////////////////////////////////////////////////

////////////////
// MIDDLEWARE //
////////////////

/////////////////USE FUNCTION//////////////
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use('/exercises', exerciseRoute);
app.use('/user', userRoute);
app.use('/blog', blogRouter);
////////////////////////////////////////////////


mongoose.connect(mongoURI,
  {useNewUrlParser: true, useUnifiedTopology: true}
);


///////////MONGO CONNECTION UPDATES//////////////
//////////////////////////////////////////////////
db.on('error', (error) => console.log(error.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected!'));
db.on('disconnected', () => console.log('mongo disconnected!'));
db.on('open', () => console.log('connection opened!'));
///////////////////////////////////////////////////////


//IMPORTING AND CALLING PRODUCT ROUTE





// Initial CHECK MESSAGE /////
app.get('/', (req, res) => {
    res.status(200).json({
      message: 'SUCCESS'
    })
  });
/////////////////////////////////



app.listen(PORT, () => console.log('listening on port ' + PORT));