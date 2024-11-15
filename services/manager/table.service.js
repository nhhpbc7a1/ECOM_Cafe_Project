import db from '../../ultis/db.js';

const generateQRCode = () => {
    // Hàm tạo mã QR ngẫu nhiên, có thể tùy chỉnh độ dài
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let qrCode = '';
    for (let i = 0; i < 10; i++) {
        qrCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return qrCode;
};

const createUniqueQRCode = async () => {
    let unique = false;
    let newQRCode = '';

    while (!unique) {
        newQRCode = generateQRCode();

        // Kiểm tra xem mã QR đã tồn tại chưa
        const existingQRCode = await db('tables').where({ qr_code: newQRCode }).first();

        if (!existingQRCode) {
            unique = true;
        }
    }

    return newQRCode;
};

export default {
    findTable_ByBranchID(branch_id) {
        return db('tables')
            .join('areas', 'tables.area_id', 'areas.area_id')
            .where('tables.branch_id', branch_id)
            .select(
                'tables.table_id',
                'tables.table_name',
                'tables.qr_code',
                'tables.is_available',
                'areas.name AS area_name',
            );
    },
    find_branch_areas(branch_id) {
        return db('areas')
           .where('branch_id', branch_id);
    },
    add(entity) {
        return db('tables').insert(entity);
    },
    generateQRCode() { 
        return createUniqueQRCode(); 
    },
    findByID(id) {
        return db('tables')
           .where('table_id', id)
           .first();
    },
    patch(table_id, entity) {
        return db('tables')
           .where('table_id', table_id)
           .update(entity);
    },
    del(table_id) {
        return db('tables').where('table_id', table_id).del();
    }
}