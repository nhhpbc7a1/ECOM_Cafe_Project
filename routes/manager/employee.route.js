import express from 'express';
import employeeService from '../../services/manager/employee.service.js';
import bcrypt from 'bcryptjs'

const router = express.Router();

// route for /manager/employee/...

router.use((req, res, next) => {
    res.locals.active = 'employee'; // Đặt giá trị 'active' mặc định
    next(); // Chuyển sang middleware/route handler tiếp theo
});

router.get('/', async function (req, res) {
    // const branch_id = req.query.accountid || 0;
    const branch_id = 1;
    const list = await employeeService.findAll(branch_id);

    // console.log(list);
    // return;

    res.render('vwManager/employee/list', {
        employees: list
    });
});

router.get('/add', async function (req, res) {
    res.render('vwManager/employee/add');
});

router.post('/del', async function (req, res) {
    await employeeService.del(req.body.employee_id);
    res.redirect('/manager/employee');
});


router.get('/edit', async function (req, res) {
    const id = +req.query.id || 0;
    const entity = await employeeService.findByID(id);

    if (!entity) {
        return res.redirect('/manager/employee');
    }
    //console.log(entity);
    res.render('vwManager/employee/edit', {
        employee: entity
    });
});


router.post('/patch', async function (req, res) {
    const branch_id = 1;
    const encrypted_password = await bcrypt.hash(req.body.password, 8);
    const account_id = req.body.account_id;
    const newAccount = {
        email: req.body.email,
        password: encrypted_password,
        role_id: 3
    } 
    await employeeService.patch_account(account_id, newAccount);

    const thisAccount = await employeeService.findByEmail(req.body.email);

    const employee_id = req.body.employee_id;
    const newEmployee = {
        employee_name: req.body.employee_name,
        branch_id: branch_id,
        account_id: thisAccount.account_id,
    }
    await employeeService.patch_employee(employee_id, newEmployee);
    res.redirect('/manager/employee');
});

router.post('/add', async function (req, res) {
    const branch_id = 1;
    const encrypted_password = await bcrypt.hash(req.body.password, 8);
    
    const newAccount = {
        email: req.body.email,
        password: encrypted_password,
        role_id: 3
    } 
    await employeeService.add_account(newAccount);

    const thisAccount = await employeeService.findByEmail(req.body.email);

    const newEmployee = {
        employee_name: req.body.employee_name,
        branch_id: branch_id,
        account_id: thisAccount.account_id,
    }
    await employeeService.add_employee(newEmployee);
    res.redirect('/manager/employee');
});

router.get('/is-available', async function (req, res) {
    const email = req.query.email;
    const account = await employeeService.findByEmail(email);

    if (account) {
        return res.json(true);
    }
    res.json(false);
});


export default router;