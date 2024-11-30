import express from 'express';
import managerService from '../../services/admin/manager.service.js';
import bcrypt from 'bcryptjs'

const router = express.Router();

// route for /admin/manager/...

router.use((req, res, next) => {
    res.locals.active = 'manager'; // Đặt giá trị 'active' mặc định
    next(); // Chuyển sang middleware/route handler tiếp theo
});

router.get('/', async function (req, res) {
    const list = await managerService.findAll();
    // res.redirect('/admin/');
    
    res.render('vwAdmin/manager/list', {
        managers: list,
    });
});

router.get('/add', async function (req, res) {
    res.render('vwAdmin/manager/add');
});

router.post('/del', async function (req, res) {
    await managerService.del(req.body.manager_id);
    res.redirect('/admin/manager');
});


router.get('/edit', async function (req, res) {
    const id = +req.query.id || 0;
    const entity = await managerService.findByID(id);

    if (!entity) {
        return res.redirect('/admin/manager');
    }
    res.render('vwAdmin/manager/edit', {
        manager: entity
    });
});


router.post('/patch', async function (req, res) {
    const account_id = req.body.account_id;
    const manager_id = req.body.manager_id;
    const encrypted_password = await bcrypt.hash(req.body.password, 8);
    const newAccount = {
        email: req.body.email,
        password: encrypted_password,
        role_id: 2
    } 
    await managerService.patch_account(account_id, newAccount);

    const newManager = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        account_id: account_id,
    }
    await managerService.patch_manager(manager_id, newManager);
    res.redirect('/admin/manager');
});

router.post('/add', async function (req, res) {
    const encrypted_password = await bcrypt.hash(req.body.password, 8);
    const newAccount = {
        email: req.body.email,
        password: encrypted_password,
        role_id: 2
    } 
    await managerService.add_account(newAccount);

    const thisAccount = await managerService.findByEmail(req.body.email);

    const newManager = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        account_id: thisAccount.account_id,
    }
    await managerService.add_manager(newManager);
    res.redirect('/admin/manager');
});


export default router;