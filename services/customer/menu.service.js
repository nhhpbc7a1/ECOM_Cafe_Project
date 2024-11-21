import db from '../../ultis/db.js';

export default {
    async findall() {
        const items = await db('menu_items')
            .join('categories', 'menu_items.category_id', '=', 'categories.category_id')
            .select('menu_items.*', 'categories.category_name')
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
                .select('menu_items.*', 'categories.category_name')
                .where(function() {
                    // Tìm kiếm trong tên sản phẩm hoặc tên danh mục
                    this.where('menu_items.name', 'like', `%${query}%`)
                        .orWhere('categories.category_name', 'like', `%${query}%`);
                })
                .andWhere('menu_items.is_available', 1) // Chỉ lấy sản phẩm khả dụng
                .orderBy('categories.category_name');
    
            return items;
        } catch (err) {
            console.error('Error searching items:', err);
            throw new Error('Unable to search items');
        }
    }
}
