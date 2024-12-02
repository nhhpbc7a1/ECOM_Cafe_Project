import express from 'express';
import session from 'express-session';
import numeral from 'numeral';
import { dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import hbs_sections from 'express-handlebars-sections';
import casherRouter from './routes/casher.route.js'
import customerRouter from './routes/customer.route.js'
import managerRouter from './routes/manager.route.js'
import adminRouter from './routes/admin.route.js'
import { authManager } from './middlewares/auth.js';
import { authAdmin } from './middlewares/auth.js';



const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());

// import managerRouter from './routes/manager.route.js';  // Import 1 lần duy nhất
// app.use('/manager', managerRouter);

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: false,
    helpers: {
        format_price(value) {
            return numeral(value).format('0,0') + ' đ';
        },
        json(context) {
            return JSON.stringify(context);
        },
        ifEquals(arg1, arg2, options) {
            return arg1 == arg2 ? options.fn(this) : options.inverse(this);
        },
        eq(arg1, arg2) {
            return arg1 === arg2; // Trả về true nếu 2 giá trị bằng nhau
        },
        section: hbs_sections(),
        containTopping(array, topping_id) {
            if (Array.isArray(array)) {
                return array.some(item => item.topping_id.toString() === topping_id.toString());
            }
            return false;
        }
    }
}));

app.set('view engine', 'hbs');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))

app.use(async function (req, res, next) {
    if (!req.session.auth) {
        req.session.auth = false;
    }
    res.locals.auth = req.session.auth;
    res.locals.authAccount = req.session.authAccount;
    res.locals.branchInfo = req.session.branchInfo;
    next();
});


// Khai báo thư mục chứa các file tĩnh
app.use(express.static('public'));
app.use('/static', express.static('static'));

app.use('/node_modules', express.static('node_modules'));

// Khai báo thư mục chứa các file views
app.set('views', './views');

app.get('/', function (req, res) {
    res.render('home', { layout: false });
});



import menuRoutes from './routes/customer/menu.route.js';
app.use('/menu', menuRoutes);
import cartRoutes from './routes/customer/cart.route.js';
app.use('/cart', cartRoutes);
import detailRoutes from './routes/customer/detail.route.js'
app.use('/detail',detailRoutes)

import accountRoutes from './routes/account.route.js';
app.use('/account', accountRoutes);

app.use('/manager', authManager, managerRouter);

app.use('/casher', casherRouter);

app.use('/customer', customerRouter);

app.use('/admin', authAdmin, adminRouter);
// app.use('/admin', adminRouter);

app.listen(3000, function () {
    console.log('app is running at http://localhost:3000');
});


