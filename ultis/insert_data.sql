﻿USE fnbservice_management;
SET FOREIGN_KEY_CHECKS = 0; 
-- Bảng roles
INSERT INTO roles (role_name) 
VALUES ('Admin'), ('Manager'), ('Employee'), ('Chef'), ('Waiter');

-- Bảng accounts
INSERT INTO accounts (username, password, role_id) 
VALUES ('admin_user', 'password_hash', 1), 
       ('manager_user1', 'password_hash', 2),
       ('employee_user1', 'password_hash', 3),
       ('chef_user', 'password_hash', 4),
       ('waiter_user', 'password_hash', 5);

-- Bảng managers
INSERT INTO managers (name, phone, email, address, account_id)
VALUES ('John Doe', '123456789', 'john1@example.com', '123 Main St', 2),
       ('Jane Smith', '987654321', 'jane@example.com', '456 Oak St', 3),
       ('Tom Johnson', '456123789', 'tom@example.com', '789 Pine St', 4),
       ('Linda Brown', '321654987', 'linda@example.com', '101 Elm St', 5),
       ('Jack Wilson', '654987321', 'jack@example.com', '202 Maple St', 6);

-- Bảng branches
INSERT INTO branches (manager_id, name, contact_phone, address, coordinates, logo_href, fnb_date_counter)
VALUES (1, 'Main Branch', '123456789', '123 Main St', '10.8231, 106.6297', 'logo1.png', 100),
       (2, 'Second Branch', '987654321', '456 Oak St', '10.7321, 106.6807', 'logo2.png', 200),
       (3, 'Third Branch', '456123789', '789 Pine St', '10.7501, 106.6300', 'logo3.png', 300),
       (4, 'Fourth Branch', '321654987', '101 Elm St', '10.8001, 106.7000', 'logo4.png', 400),
       (5, 'Fifth Branch', '654987321', '202 Maple St', '10.8101, 106.7200', 'logo5.png', 500);

-- Bảng areas
INSERT INTO areas (branch_id, name) 
VALUES (1, 'Tầng 1'), 
       (1, 'Tầng 2'), 
       (2, 'Tầng 3'), 
       (3, 'Khu vực A'), 
       (4, 'Khu vực B');

-- Bảng tables
INSERT INTO tables (branch_id, area_id, table_name, qr_code, is_available) 
VALUES (1, 1, 'Table 1', 'QR_001', 1), 
       (1, 2, 'Table 2', 'QR_002', 0), 
       (2, 3, 'Table 3', 'QR_003', 1), 
       (3, 4, 'Table 4', 'QR_004', 1), 
       (4, 5, 'Table 5', 'QR_005', 0);

-- Bảng menus
INSERT INTO menus (branch_id, menu_color, background_image_href)
VALUES (1, 'Blue', 'menu_background1.png'),
       (2, 'Green', 'menu_background2.png'),
       (3, 'Red', 'menu_background3.png'),
       (4, 'Yellow', 'menu_background4.png'),
       (5, 'Purple', 'menu_background5.png');

-- Bảng categories
INSERT INTO categories (category_name)
VALUES ('Drinks'), ('Food'), ('Desserts'), ('Appetizers'), ('Specials');

-- Bảng menu_items
INSERT INTO menu_items (menu_id, category_id, name, description, image_href, cost_price, sale_price, is_available, is_spicy, has_vegetables)
VALUES
    -- 10 Drinks (category_id = 1)
    (1, 1, 'Iced Tea', 'Refreshing iced tea', 'menu_items/1/main.jpg', 8.00, 12.00, 1, 0, 0),
    (2, 1, 'Lemonade', 'Fresh lemonade', 'menu_items/2/main.jpg', 7.00, 10.00, 1, 0, 0),
    (3, 1, 'Mango Smoothie', 'Mango smoothie', 'menu_items/3/main.jpg', 12.00, 18.00, 1, 0, 1),
    (4, 1, 'Coconut Water', 'Chilled coconut water', 'menu_items/4/main.jpg', 6.00, 9.00, 1, 0, 0),
    (5, 1, 'Espresso', 'Rich espresso shot', 'menu_items/5/main.jpg', 10.00, 15.00, 1, 0, 0),
    (6, 1, 'Latte', 'Creamy latte', 'menu_items/6/main.jpg', 12.00, 18.00, 1, 0, 0),
    (7, 1, 'Green Tea', 'Organic green tea', 'menu_items/7/main.jpg', 9.00, 13.00, 1, 0, 0),
    (8, 1, 'Milkshake', 'Classic milkshake', 'menu_items/8/main.jpg', 10.00, 14.00, 1, 0, 0),
    (9, 1, 'Hot Chocolate', 'Warm hot chocolate', 'menu_items/9/main.jpg', 8.00, 11.00, 1, 0, 0),
    (10, 1, 'Mango Juice', 'Fresh mango juice', 'menu_items/10/main.jpg', 11.00, 16.00, 1, 0, 1),

    -- 10 Main Dishes (Food) (category_id = 2)
    (11, 2, 'Beef Steak', 'Grilled beef steak', 'menu_items/11/main.jpg', 25.00, 40.00, 1, 1, 0),
    (12, 2, 'Baked Chicken Rice', 'American baked chicken and fried rice', 'menu_items/12/main.jpg', 15.00, 22.00, 1, 0, 1),
    (13, 2, 'Pasta Carbonara', 'Italian pasta with creamy sauce', 'menu_items/13/main.jpg', 18.00, 28.00, 1, 0, 0),
    (14, 2, 'Vegetarian Pizza', ' Wheat pizza with mixed vegetables', 'menu_items/14/main.jpg', 20.00, 30.00, 1, 0, 1),
    (15, 2, 'Pho', 'Vietnamese noodle soup', 'menu_items/15/main.jpg', 10.00, 15.00, 1, 0, 1),
    (16, 2, 'Sushi', 'Assorted sushi', 'menu_items/16/main.jpg', 22.00, 35.00, 1, 0, 1),
    (17, 2, 'Fried Rice', 'Special fried rice', 'menu_items/17/main.jpg', 12.00, 18.00, 1, 0, 1),
    (18, 2, 'Pad Thai', 'Stir-fried noodles', 'menu_items/18/main.jpg', 14.00, 20.00, 1, 1, 1),
    (19, 2, 'Fish Tacos', 'Crispy fish tacos', 'menu_items/19/main.jpg', 15.00, 22.00, 1, 0, 1),
    (20, 2, 'Grilled Salmon', 'Salmon with herbs', 'menu_items/20/main.jpg', 28.00, 45.00, 1, 0, 1),

    -- 10 Appertizers (category_id = 3)
    (21, 3, 'Chocolate Cake', 'Rich chocolate cake', 'menu_items/21/main.jpg', 8.00, 12.00, 1, 0, 0),
    (22, 3, 'Fruit Tart', 'Fresh fruit tart', 'menu_items/22/main.jpg', 10.00, 15.00, 1, 0, 1),
    (23, 3, 'Creme Brulee', 'Creamy Crème brûlée', 'menu_items/23/main.jpg', 9.00, 13.00, 1, 0, 0),
    (24, 3, 'Cheesecake', 'Classic Bery Ricotta cheesecake', 'menu_items/24/main.jpg', 11.00, 16.00, 1, 0, 0),
    (25, 3, 'Brownies', 'Chocolate brownies', 'menu_items/25/main.jpg', 7.00, 10.00, 1, 0, 0),
    (26, 3, 'Panna Cotta', 'Italian berry panna cotta', 'menu_items/26/main.jpg', 10.00, 15.00, 1, 0, 0),
    (27, 3, 'Apple Pie', 'Homemade apple pie', 'menu_items/27/main.jpg', 9.00, 14.00, 1, 0, 0),
    (28, 3, 'Tiramisu', 'Italian tiramisu', 'menu_items/28/main.jpg', 12.00, 18.00, 1, 0, 0),
    (29, 3, 'Pavlova', 'Fruit pavlova', 'menu_items/29/main.jpg', 11.00, 17.00, 1, 0, 1),
    (30, 3, 'Mango Sticky Rice', 'Thai mango sticky rice', 'menu_items/30/main.jpg', 10.00, 14.00, 1, 0, 1);

-- Bảng orders
INSERT INTO orders (table_id, order_date, status, total_amount)
VALUES (1, NOW(), 'Completed', 45.00),
       (2, NOW(), 'Pending', 30.00),
       (3, NOW(), 'In Progress', 60.00),
       (4, NOW(), 'Completed', 50.00),
       (5, NOW(), 'Cancelled', 0.00);

-- Bảng order_items
INSERT INTO order_items (order_id, menu_item_id, quantity, note)
VALUES (1, 1, 2, 'Less sugar'), 
       (2, 2, 1, 'Extra cheese'), 
       (3, 3, 3, 'No topping'), 
       (4, 4, 1, 'Spicy'), 
       (5, 5, 2, 'No dressing');

-- Bảng order_payments
INSERT INTO order_payments (order_id, payer_card_id, pay_date, pay_content, send_amount)
VALUES (1, 'CARD123', NOW(), 'Paid with card', 45.00),
       (2, 'CARD456', NOW(), 'Paid with cash', 30.00),
       (3, 'CARD789', NOW(), 'Paid with card', 60.00),
       (4, 'CARD101', NOW(), 'Paid with cash', 50.00),
       (5, 'CARD202', NOW(), 'Not paid', 0.00);

-- Bảng employees
INSERT INTO employees (employee_name, branch_id, account_id)
VALUES ('Alice', 1, 3),
       ('Bob', 2, 4),
       ('Charlie', 3, 5),
       ('David', 4, 6),
       ('Eve', 5, 7);

-- Bảng reviews
INSERT INTO reviews (order_id, branch_id, rating, comment, review_date)
VALUES (1, 1, 5, 'Great service!', NOW()),
       (2, 2, 4, 'Good food.', NOW()),
       (3, 3, 3, 'Average experience.', NOW()),
       (4, 4, 2, 'Not satisfied.', NOW()),
       (5, 5, 1, 'Poor service.', NOW());

-- Bảng service_packages
INSERT INTO service_packages (day_amount, fee_amount)
VALUES (30, 99.99), 
       (60, 189.99), 
       (90, 279.99), 
       (120, 369.99), 
       (150, 459.99);

-- Bảng service_package_payment
INSERT INTO service_package_payment (branch_id, service_package_id, date_bought)
VALUES (1, 1, NOW()),
       (2, 2, NOW()),
       (3, 3, NOW()),
       (4, 4, NOW()),
       (5, 5, NOW());

-- Bảng faqs
INSERT INTO faqs (question, answer, branch_id)
VALUES ('What are the opening hours?', '9 AM to 10 PM', 1),
       ('Is there parking available?', 'Yes, free parking.', 2),
       ('Do you offer vegetarian options?', 'Yes, several options available.', 3),
       ('Do you accept credit cards?', 'Yes, all major cards accepted.', 4),
       ('Is Wi-Fi available?', 'Yes, free Wi-Fi for customers.', 5);

-- Bảng menu_item_options
INSERT INTO menu_item_options (option_name, cost_price, sale_price, menu_item_id, image_href)
VALUES ('Extra Shot', 1.00, 1.50, 1, 'extra_shot.png'),
       ('Large Size', 1.50, 2.00, 2, 'large_size.png'),
       ('Extra Cheese', 0.50, 1.00, 3, 'extra_cheese.png'),
       ('Add Avocado', 0.80, 1.20, 4, 'avocado.png'),
       ('Double Topping', 1.20, 1.80, 5, 'double_topping.png');

-- Bảng order_item_options
INSERT INTO order_item_options (quantity, order_item_id, menu_item_option_id)
VALUES (1, 1, 1),
       (2, 2, 2),
       (1, 3, 3),
       (1, 4, 4),
       (2, 5, 5);
SET FOREIGN_KEY_CHECKS = 1;  -- Bật lại kiểm tra khóa ngoại