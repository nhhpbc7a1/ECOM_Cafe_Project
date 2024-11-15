import express from 'express';
import numeral from 'numeral';
import { dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import casherRouter from './routes/casher.route.js'
import customerRouter from './routes/customer.route.js'

const app = express();

app.use(express.urlencoded({ 
    extended: true 
}));
app.use(cookieParser());

import managerRouter from './routes/manager.route.js';  // Import 1 lần duy nhất
app.use('/manager', managerRouter);

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'bs4',
    helpers: {
        format_price(value) {
            return numeral(value).format('0,0') + ' đ';
        },
        json(context) {
            return JSON.stringify(context);
        }
    }
}));

app.set('view engine', 'hbs');

// Khai báo thư mục chứa các file tĩnh
app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));

// Khai báo thư mục chứa các file views
app.set('views', './views');

app.get('/', function(req, res) {
    res.render('home', { layout: false });
});


app.use('/manager', managerRouter);

app.use('/casher', casherRouter);

app.use('/customer', customerRouter);


app.listen(3000, function() {
    console.log('app is running at http://localhost:3000');    
});


