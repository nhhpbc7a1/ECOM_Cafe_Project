import express from 'express';
import numeral from 'numeral';
import {dirname, extname} from 'path';
import {fileURLToPath} from 'url';
import { engine } from 'express-handlebars';

const app = express();

app.use(express.urlencoded({ 
    extended:true 
}));

app.engine('hbs', engine({
    extname: '.hbs',
    defaultlayout: 'bs4',
    helpers: {
        format_price(value) {
            return numeral(value).format('0,0')+ ' đ';
        }
    }
}));

app.set('view engine', 'hbs');

// Khai báo thư mục chứa các file tĩnh
app.use(express.static('public'));

// Khai báo thư mục chứa các file views
app.set('views', './views');

app.get('/', function(req, res) {
    res.render('home', {layout: false});
});

import managerRouter from './routes/manager.route.js'
app.use('/manager', managerRouter);

app.listen(3000, function() {
    console.log('app is running at http://localhost:3000');    
});