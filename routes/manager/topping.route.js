import express from 'express';
import toppingService from '../../services/manager/topping.service.js';

const router = express.Router();


router.get('/', async function (req, res) {
    const menu_id = 1;
    const list = await toppingService.findAll(menu_id);
    // console.log(list);
    // return;
    res.render('vwManager/topping/list', {
        toppings: list
    });
});

router.get('/add', async function (req, res) {
    res.render('vwManager/topping/add');
});

router.post('/del', async function (req, res) {
    await toppingService.del(req.body.topping_id);
    res.redirect('/manager/topping');
});


router.get('/edit', async function (req, res) {
    const id = +req.query.id || 0;
    const entity = await toppingService.findByID(id);

    if (!entity) {
        return res.redirect('/manager/topping');
    }

    entity.is_available = entity.is_available && entity.is_available[0] === 1;

    console.log(entity);
    return;
    res.render('vwManager/topping/edit', {
        categories: categoryList,
        topping: entity
    });
});


router.post('/patch', async function (req, res) {
    // console.log(req.body);
    const topping_id = req.body.topping_id;
    const changes = {
        name: req.body.name,
        description: req.body.description,
        cost_price: req.body.cost_price,
        sale_price: req.body.sale_price,
        is_spicy: req.body.is_spicy === 'on',
        has_vegetables: req.body.has_vegetables === 'on',
        category_id: req.body.category_id,
        menu_id: 1,
        is_available: req.body.is_available === 'on',
    };
    // console.log(changes);
    await toppingService.patch(topping_id, changes);
    res.redirect('/manager/topping');
});

router.post('/add', async function (req, res) {
    // console.log(req.body);
    const menu_id = 1;
    const newMenuItem = {
        name: req.body.name,
        description: req.body.description,
        cost_price: req.body.cost_price,
        sale_price: req.body.sale_price,
        is_spicy: req.body.is_spicy === 'on',
        has_vegetables: req.body.has_vegetables === 'on',
        category_id: req.body.category_id,
        menu_id: menu_id,
        is_available: req.body.is_available === 'on',
    }
    await toppingService.add(newMenuItem);
    res.redirect('/manager/topping');
});


export default router;