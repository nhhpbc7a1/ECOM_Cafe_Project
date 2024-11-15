import express from 'express';
import menu_itemService from '../../services/manager/menu_item.service.js';
import categoryService from '../../services/category.service.js';

const router = express.Router();


router.get('/', async function (req, res) {
    // const branch_id = req.query.accountid || 0;
    const branch_id = 1;
    const list = await menu_itemService.findAll(branch_id);
    res.render('vwManager/menu_item/list', {
        menu_items: list
    });
});

router.get('/add', async function (req, res) {
    const categoryList = await categoryService.findAll();
    res.render('vwManager/menu_item/add', {
        categories: categoryList
    });
});

router.post('/del', async function (req, res) {
    await menu_itemService.del(req.body.menu_item_id);
    res.redirect('/manager/menu_item');
});


router.get('/edit', async function (req, res) {
    const id = +req.query.id || 0;
    const entity = await menu_itemService.findByID(id);
    const categoryList = await categoryService.findAll();

    if (!entity) {
        return res.redirect('/manager/menu_item');
    }

    entity.is_available = entity.is_available && entity.is_available[0] === 1;
    entity.is_spicy = entity.is_spicy && entity.is_spicy[0] === 1;
    entity.has_vegetables = entity.has_vegetables && entity.has_vegetables[0] === 1;

    console.log(entity);
    res.render('vwManager/menu_item/edit', {
        categories: categoryList,
        menu_item: entity
    });
});


router.post('/patch', async function (req, res) {
    // console.log(req.body);
    const menu_item_id = req.body.menu_item_id;
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
    await menu_itemService.patch(menu_item_id, changes);
    res.redirect('/manager/menu_item');
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
    await menu_itemService.add(newMenuItem);
    res.redirect('/manager/menu_item');
});


export default router;