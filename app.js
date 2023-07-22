
// environment setting 僅在非正式環境時使用dotenv
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config({ path: './.env' });
// }

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// require handlebars in the project
const exphbs =  require('express-handlebars').engine;  //<---express-handlebars版本v7

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set ('view engine', 'hbs');

// setting static files
app.use(express.static('public'));

// setting body-parser 
app.use(express.urlencoded({ extended: true }));

// setting method-override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));  


// routes setting
const routes = require('./routes');
app.use(routes);

// start and listen on the Express server
app.listen(port, () =>{
    console.log(`Express is listening on http://localhost:${port}`)
})