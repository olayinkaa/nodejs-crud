require('./models/db');
const express = require('express');
var app = express();

//------------------------------------------------------------
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//view set up
const path = require('path');
const exphbs = require('express-handlebars');
app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs', exphbs({extname:'hbs', defaultLayout: 'mainLayout',layoutsDir:__dirname+'/views/layouts/'}));
app.set('view engine','hbs');

//-------------------------including the controller-------Routing-----------------------------
const employeeController = require('./controllers/employeeController');
app.use('/employee',employeeController);

//----------------------------------------------------------------------

app.listen(3000, () =>{

    console.log('Express server started at port : 3000');
});
