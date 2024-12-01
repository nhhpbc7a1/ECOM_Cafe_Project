import db from '../../ultis/db.js';

export default {
    async findall() {
        const items = await db('menu_items')
            .join('categories', 'menu_items.category_id', '=', 'categories.category_id')
            .select(
                'menu_items.menu_item_id',
                'menu_items.name',
                'menu_items.description',
                'menu_items.image_href', 
                'menu_items.cost_price',
                'menu_items.sale_price',
                'menu_items.is_available',
                'categories.category_name'
            )
            .where('menu_items.is_available', 1)
            .orderBy('categories.category_name');
        
        // Nhóm các items theo category_name
        const groupedItems = items.reduce((acc, item) => {
            if (!acc[item.category_name]) {
                acc[item.category_name] = [];
            }
            acc[item.category_name].push(item);
            return acc;
        }, {});
        return groupedItems;
    },
    async findallByCategory(category_id) {
        try {
            const items = await db('menu_items')
                .join('categories', 'menu_items.category_id', '=', 'categories.category_id')
                .select('menu_items.*', 'categories.category_name')
                .where('menu_items.category_id', category_id) // Lọc theo category_id
                .andWhere('menu_items.is_available', 1)
                .orderBy('categories.category_name');
            
            const groupedItems = items.reduce((acc, item) => {
                if (!acc[item.category_name]) {
                    acc[item.category_name] = [];
                }
                acc[item.category_name].push(item);
                return acc;
            }, {});
            
            return groupedItems;
        } catch (err) {
            console.error('Error fetching items by category:', err);
            throw new Error('Unable to fetch items by category');
        }
    },
    async findAllCategories() {
        try {
            const categories = await db('categories')
                .select('category_id', 'category_name', 'image_href')  // Chọn các trường cần thiết
                .orderBy('category_name');  // Sắp xếp theo tên danh mục

            return categories;
        } catch (err) {
            console.error('Error fetching categories:', err);
            throw new Error('Unable to fetch categories');
        }
    },
    async countTotalItems() {
        const count = await db('menu_items').where('is_available', 1).count('* as total');
        return count[0].total;  // Trả về số lượng sản phẩm
    },
    async search(query) {
        try {
            const items = await db('menu_items')
                .join('categories', 'menu_items.category_id', '=', 'categories.category_id')
                .select(
                    'menu_items.name', 
                    'menu_items.cost_price', 
                    'menu_items.image_href',
                    'categories.category_name'
                )
                .where(function() {
                    this.where('menu_items.name', 'like', `%${query}%`)
                        .orWhere('categories.category_name', 'like', `%${query}%`);
                })
                .andWhere('menu_items.is_available', 1) // Chỉ lấy sản phẩm khả dụng
                .limit(50) // Giới hạn số kết quả trả về để tăng hiệu năng
                .orderBy('categories.category_name');
    
            return items;
        } catch (err) {
            console.error('Error searching items:', err);
            throw new Error('Unable to search items');
        }
    },
    async findById(product_id) {
        try {
            // Truy vấn menu_items và join với categories để lấy thông tin sản phẩm theo product_id
            const item = await db('menu_items')
                .join('categories', 'menu_items.category_id', '=', 'categories.category_id')
                .select(
                    'menu_items.menu_item_id',
                    'menu_items.name',
                    'menu_items.description',
                    'menu_items.image_href', 
                    'menu_items.cost_price',
                    'menu_items.sale_price',
                    'menu_items.is_available',
                    'categories.category_name'
                )
                .where('menu_items.menu_item_id', product_id) 
                .andWhere('menu_items.is_available', 1) 
                .first(); 
    
            if (!item) {
                throw new Error('Product not found');
            }
    
            return item;
        } catch (err) {
            console.error('Error fetching product by ID:', err);
            throw new Error('Unable to fetch product by ID');
        }
    },
    async getRandomProducts() {
        try {
            const items = await db('menu_items')
                .select('*')
                .where('is_available', 1)
                .orderByRaw('RAND()')
                .limit(5);
            return items;
        } catch (err) {
            console.error('Error fetching random products:', err);
            throw new Error('Unable to fetch random products');
        }
    }
    
}
