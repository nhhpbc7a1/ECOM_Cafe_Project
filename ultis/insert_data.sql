USE fnbservice_management;

INSERT INTO roles (role_name) VALUES 
('Admin'),
('Manager'),
('Employee');

INSERT INTO accounts (username, password, role_id) VALUES 
('admin_user', 'password123', 1),
('manager_user1', 'password123', 2),
('manager_user2', 'password123', 2),
('employee_user1', 'password123', 3),
('employee_user2', 'password123', 3);

INSERT INTO managers (name, phone, email, address, account_id) VALUES 
('Nguyễn Văn A', '0123456789', 'nguyenvana@example.com', '123 Đường ABC, Quận 1', 2),
('Trần Thị B', '0987654321', 'tranthib@example.com', '456 Đường DEF, Quận 2', 3);

INSERT INTO branches (manager_id, name, contact_phone, address, coordinates, logo_href, fnb_date_counter) VALUES 
(1, 'Chi nhánh 1', '0987654321', '456 Đường DEF, Quận 2', '10.8231,106.6297', 'logo1.png', 100),
(2, 'Chi nhánh 2', '0976543210', '789 Đường GHI, Quận 3', '10.7754,106.7001', 'logo2.png', 150);

INSERT INTO tables (branch_id, qr_code, is_available, position) VALUES 
(1, 'QR123', 1, 'Khu A - Bàn 1'),
(1, 'QR124', 1, 'Khu A - Bàn 2'),
(2, 'QR223', 0, 'Khu B - Bàn 1'),
(2, 'QR224', 1, 'Khu B - Bàn 2');

INSERT INTO menus (branch_id, menu_color, background_image_href) VALUES 
(1, 'Red', 'bg1.png'),
(2, 'Blue', 'bg2.png');

INSERT INTO categories (category_name) VALUES 
('Khai vị'),
('Món chính'),
('Tráng miệng');

INSERT INTO menu_items (menu_id, category_id, name, description, image_href, cost_price, sale_price, is_available, is_spicy, has_vegetables) VALUES 
(1, 1, 'Gỏi cuốn', 'Món gỏi cuốn tươi ngon', 'goi_cuon.png', 15000, 30000, 1, 0, 1),
(1, 2, 'Bún bò Huế', 'Bún bò Huế thơm ngon', 'bun_bo_hue.png', 30000, 60000, 1, 1, 0),
(1, 3, 'Chè ba màu', 'Món chè ba màu truyền thống', 'che_ba_mau.png', 10000, 25000, 1, 0, 0),
(2, 1, 'Súp cua', 'Súp cua nóng hổi', 'sup_cua.png', 20000, 40000, 1, 0, 1),
(2, 2, 'Phở bò', 'Phở bò tái chín', 'pho_bo.png', 35000, 70000, 1, 0, 0);

INSERT INTO orders (table_id, order_date, status, total_amount) VALUES 
(1, '2024-11-08 12:30:00', 'completed', 90000),
(2, '2024-11-08 13:00:00', 'pending', 60000),
(3, '2024-11-09 10:15:00', 'completed', 50000);

INSERT INTO order_items (order_id, menu_item_id, quantity, note) VALUES 
(1, 1, 2, 'Không hành'),
(1, 2, 1, ''),
(2, 3, 1, 'Thêm đá'),
(3, 4, 1, 'Không tiêu');

INSERT INTO order_payments (order_id, payer_card_id, pay_date, pay_content, send_amount) VALUES 
(1, 'CARD123456', '2024-11-08 12:45:00', 'Thanh toán qua thẻ', 90000),
(3, 'CARD654321', '2024-11-09 10:30:00', 'Thanh toán tiền mặt', 50000);

INSERT INTO employees (employee_name, branch_id, account_id) VALUES 
('Trần Văn B', 1, 4),
('Lê Thị C', 2, 5);

INSERT INTO reviews (order_id, branch_id, rating, comment, review_date) VALUES 
(1, 1, 5, 'Món ăn ngon, phục vụ tốt', '2024-11-08 14:00:00'),
(2, 2, 4, 'Phục vụ nhanh, giá hợp lý', '2024-11-08 14:30:00'),
(3, 1, 3, 'Chất lượng trung bình', '2024-11-09 11:00:00');

INSERT INTO service_packages (day_amount, fee_amount) VALUES 
(30, 500000),
(90, 1200000),
(180, 2000000);

INSERT INTO service_package_payment (branch_id, service_package_id, date_bought) VALUES 
(1, 1, '2024-11-01'),
(2, 2, '2024-11-01'),
(1, 3, '2024-08-01');

INSERT INTO faqs (question, answer, branch_id) VALUES 
('Giờ mở cửa thế nào?', 'Từ 8:00 sáng đến 10:00 tối', 1),
('Có giao hàng không?', 'Hiện tại có hỗ trợ giao hàng', 2),
('Phí dịch vụ bao nhiêu?', 'Tùy theo gói dịch vụ', 1);

INSERT INTO menu_item_options (option_name, cost_price, sale_price, menu_item_id, image_href) VALUES 
('Thêm chả giò', 5000, 10000, 1, 'cha_gio.png'),
('Thêm bò viên', 7000, 15000, 2, 'bo_vien.png'),
('Thêm sụn gân', 6000, 12000, 4, 'sun_gan.png');

INSERT INTO order_item_options (quantity, order_item_id, menu_item_option_id) VALUES 
(1, 1, 1),
(2, 2, 2),
(1, 3, 3);
