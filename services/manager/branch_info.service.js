import db from '../../ultis/db.js';
import moment from 'moment';
export default {
    findByID(branch_id) {
        return db('branches').where('branch_id', branch_id).first();
    },
    patch(branch_id, entity) {
        return db('branches')
           .where('branch_id', branch_id)
           .update(entity);
    },
    async getCurrentServicePackage(branch_id) {
        const result = await db('service_package_payment')
            .join('service_packages', 'service_package_payment.service_package_id', 'service_packages.service_package_id')
            .where('service_package_payment.branch_id', branch_id)
            .orderBy('service_package_payment.date_bought', 'desc') // Get the latest service package
            .select(
                'service_packages.service_package_id',
                'service_packages.day_amount',
                'service_packages.fee_amount',
                'service_package_payment.date_bought'
            )
            .first(); // Fetch only the most recent record

        if (!result) {
            return null; // No service package found
        }

        // Calculate remaining days
        const expirationDate = moment(result.date_bought).add(result.day_amount, 'days');
        const today = moment();
        const remainingDays = expirationDate.diff(today, 'days');

        return {
            service_package_id: result.service_package_id,
            fee_amount: result.fee_amount,
            day_amount: result.day_amount,
            date_bought: result.date_bought,
            remaining_days: Math.max(0, remainingDays), // Ensure no negative days
        };
    },
    async purchaseServicePackage(branch_id, service_package_id) {
        // Log giá trị để kiểm tra
        console.log('Service Package ID:', service_package_id);
        console.log('Branch ID:', branch_id);
    
        // Fetch the current service package to determine expiration
        const currentPackage = await db('service_package_payment')
            .where('branch_id', branch_id)
            .orderBy('date_bought', 'desc')
            .first();
    
        // Get the selected service package details
        console.log('service_package_id:', service_package_id);
        const packageDetails = await db('service_packages')
            .where({ service_package_id: service_package_id }) // Cập nhật cú pháp truy vấn
            .first();
    
        if (!packageDetails) {
            throw new Error('Invalid service package');
        }
    
        // Calculate the new expiration date
        const currentDate = moment();
        const baseDate = currentPackage
            ? moment(currentPackage.date_bought).add(currentPackage.day_amount, 'days') 
            : currentDate;
    
        const newExpirationDate = baseDate.add(packageDetails.day_amount, 'days');
    
        const newPurchase = {
            branch_id: branch_id,
            service_package_id: service_package_id,
            date_bought: currentDate.format('YYYY-MM-DD HH:mm:ss'),
        };
    
        await db('service_package_payment').insert(newPurchase);
    
        return {
            success: true,
            newExpirationDate: newExpirationDate.format('YYYY-MM-DD'),
        };
    }
}