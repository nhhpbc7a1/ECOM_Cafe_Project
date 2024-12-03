import db from '../../ultis/db.js'; // Import kết nối database

export default {
    /**
     * Lấy dữ liệu biểu đồ từ cơ sở dữ liệu
     * @returns {Object} Dữ liệu theo cấu trúc của Chart.js
     */
    async get_Service_PackagesData() {
        try {
            // Truy vấn dữ liệu từ bảng service_packages
            const query = `
                SELECT 
                    service_package_id,
                    day_amount,
                    fee_amount
                FROM 
                    service_packages
                ORDER BY 
                    service_package_id ASC;
            `;

            // Thực thi truy vấn SQL
            const [rows] = await db.raw(query);

            // Debug dữ liệu trả về
            console.info("Dữ liệu từ cơ sở dữ liệu:", JSON.stringify(rows, null, 2));

            // Kiểm tra dữ liệu có tồn tại hay không
            if (!rows || rows.length === 0) {
                console.warn("Không có dữ liệu từ cơ sở dữ liệu.");
                return { labels: [], datasets: [] }; // Trả về cấu trúc rỗng nếu không có dữ liệu
            }

            // Xử lý dữ liệu để tạo cấu trúc phù hợp với Chart.js
            const labels = rows.map(({ service_package_id }) => `Gói ${service_package_id}`);
            const dayAmounts = rows.map(({ day_amount }) => day_amount || 0);
            const feeAmounts = rows.map(({ fee_amount }) => fee_amount || 0);

            const chartData = {
                labels, // Gán nhãn từ các gói
                datasets: [
                    {
                        label: 'Thời gian sử dụng (ngày)', // Dataset 1: thời gian sử dụng
                        data: dayAmounts,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Màu nền
                        borderColor: 'rgba(75, 192, 192, 1)', // Màu viền
                        borderWidth: 3
                    },
                    {
                        label: 'Chi phí (VNĐ)', // Dataset 2: chi phí
                        data: feeAmounts,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)', // Màu nền
                        borderColor: 'rgba(153, 102, 255, 1)', // Màu viền
                        borderWidth: 3
                    }
                ]
            };

            // Debug dữ liệu biểu đồ
            console.info("Dữ liệu biểu đồ (Chart.js):", JSON.stringify(chartData, null, 2));

            return chartData; // Trả về dữ liệu biểu đồ
        } catch (error) {
            // Ghi log lỗi và ném lỗi
            console.error("Lỗi khi lấy dữ liệu biểu đồ:", error.message);
            throw new Error("Không thể lấy dữ liệu từ cơ sở dữ liệu.");
        }
    },

    /**
     * Lấy dữ liệu cho biểu đồ cột từ bảng service_package_payment
     * @returns {Object} Dữ liệu cho biểu đồ cột
     */
    async get_Service_Package_Payment() {
        try {
            // Truy vấn dữ liệu từ bảng service_package_payment
            const query = `
                SELECT 
                    service_package_id,
                    COUNT(service_package_payment_id) AS transaction_count
                FROM service_package_payment
                GROUP BY service_package_id
            `;
            const [rows] = await db.raw(query);

            if (!rows || rows.length === 0) {
                console.warn("Không có dữ liệu cho biểu đồ cột.");
                return { labels: [], datasets: [] };
            }

            const labels = rows.map(row => `Gói ${row.service_package_id}`);
            const transactionCounts = rows.map(row => row.transaction_count || 0);

            const columnChartData = {
                labels,
                datasets: [
                    {
                        label: 'Số lần giao dịch',
                        data: transactionCounts,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 3
                    }
                ]
            };

            return columnChartData;
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu biểu đồ cột:", error.message);
            throw new Error("Không thể lấy dữ liệu từ cơ sở dữ liệu.");
        }
    }
};
